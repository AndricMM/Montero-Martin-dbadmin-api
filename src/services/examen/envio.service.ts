import { AppDataSource } from "../../config/data-source.js";
import { Envio, EstadoEnvio } from "../../entity/examen/Envio.js";
import { Paquete } from "../../entity/examen/Paquete.js";
import { envioRepository } from "../../repository/examen/EnvioRepository.js";
import { historialRastreoRepository } from "../../repository/examen/HistorialRastreoRepository.js";
import { DeepPartial } from "typeorm";
import { HistorialRastreo } from "../../entity/examen/HistorialRastreo.js";

export interface RastreoInput {
    ubicacion_actual: string;
    estado_evento: string;
    observaciones?: string;
}

export interface PaqueteInput {
    peso: number;
    dimensiones: string;
    contenido: string;
    almacenId: number;
}

export interface EnvioInput {
    remitenteId: number;
    destinatarioId: number;
    direccionOrigenId: number;
    direccionDestinoId: number;
    costo_total: number;
    paquetes: PaqueteInput[];
}

export class EnvioService {
    async crearEnvio(data: EnvioInput): Promise<Envio | null> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const envio = queryRunner.manager.create(Envio, {
                remitente: { id: data.remitenteId },
                destinatario: { id: data.destinatarioId },
                direccionOrigen: { id: data.direccionOrigenId },
                direccionDestino: { id: data.direccionDestinoId },
                costo_total: data.costo_total,
                fecha: new Date(),
                estado: EstadoEnvio.REGISTRADO
            });
            const envioGuardado = await queryRunner.manager.save(envio);

            for (const p of data.paquetes) {
                const paquete = queryRunner.manager.create(Paquete, {
                    envio: { id: envioGuardado.id },
                    almacen: { id: p.almacenId },
                    peso: p.peso,
                    dimensiones: p.dimensiones,
                    contenido: p.contenido
                });
                await queryRunner.manager.save(paquete);
            }

            await queryRunner.commitTransaction();
            return await envioRepository.findById(envioGuardado.id);
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }
    }

        async agregarRastreo(id: number, data: RastreoInput): Promise<Envio | null> {
        const rastreo: DeepPartial<HistorialRastreo> = {
            envio: { id },
            fecha: new Date(),
            ubicacion_actual: data.ubicacion_actual,
            estado_evento: data.estado_evento
        };
        if (data.observaciones) rastreo.observaciones = data.observaciones;

        await historialRastreoRepository.create(rastreo);
        return await envioRepository.findByIdConHistorial(id);
    }

    async listarActivos(): Promise<Envio[]> {
        return await envioRepository.findActivos();
    }

    async historialPorCliente(clienteId: number): Promise<Envio[]> {
        return await envioRepository.findByCliente(clienteId);
    }

    async actualizarCosto(id: number, costo_total: number): Promise<Envio | null> {
        await envioRepository.updateCosto(id, costo_total);
        return await envioRepository.findByIdConAuditorias(id);
    }
}

export const envioService = new EnvioService();