import { AppDataSource } from "../../config/data-source.js";
import { Envio } from "../../entity/examen/Envio.js";

export class EnvioRepository {
    private repository = AppDataSource.getRepository(Envio);

    async findById(id: number): Promise<Envio | null> {
        return await this.repository.findOne({
            where: { id },
            relations: {
                remitente: true,
                destinatario: true,
                direccionOrigen: true,
                direccionDestino: true,
                paquetes: { almacen: true }
            }
        });
    }

    async findByIdConAuditorias(id: number): Promise<Envio | null> {
        return await this.repository.findOne({
            where: { id },
            relations: { auditorias: true }
        });
    }

    async findByIdConHistorial(id: number): Promise<Envio | null> {
        return await this.repository.findOne({
            where: { id },
            relations: { historial: true },
            order: { historial: { fecha: "ASC" } }
        });
    }

    async findActivos(): Promise<Envio[]> {
        return await this.repository
            .createQueryBuilder("envio")
            .leftJoinAndSelect("envio.remitente", "remitente")
            .leftJoinAndSelect("envio.destinatario", "destinatario")
            .leftJoinAndSelect("envio.paquetes", "paquete")
            .where("envio.estado IN (:...estados)", { estados: ["REGISTRADO", "EN_TRANSITO"] })
            .orderBy("envio.fecha", "DESC")
            .getMany();
    }

    async findByCliente(clienteId: number): Promise<Envio[]> {
        return await this.repository.find({
            where: [
                { remitente: { id: clienteId } },
                { destinatario: { id: clienteId } }
            ],
            relations: {
                remitente: true,
                destinatario: true,
                paquetes: true
            },
            order: { fecha: "DESC" }
        });
    }

    async updateCosto(id: number, costo_total: number): Promise<void> {
        await this.repository.update(id, { costo_total });
    }
}

export const envioRepository = new EnvioRepository();