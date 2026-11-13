import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../config/data-source.js";
import { Paquete } from "../../entity/examen/Paquete.js";

export class PaqueteRepository {
    private repository = AppDataSource.getRepository(Paquete);

    async findById(id: number): Promise<Paquete | null> {
        return await this.repository.findOne({
            where: { id },
            relations: { envio: true, almacen: true }
        });
    }

    async create(paqueteData: DeepPartial<Paquete>): Promise<Paquete> {
        const paquete = this.repository.create(paqueteData);
        return await this.repository.save(paquete);
    }
}

export const paqueteRepository = new PaqueteRepository();