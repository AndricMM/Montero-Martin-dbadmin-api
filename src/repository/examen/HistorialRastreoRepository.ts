import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../config/data-source.js";
import { HistorialRastreo } from "../../entity/examen/HistorialRastreo.js";

export class HistorialRastreoRepository {
    private repository = AppDataSource.getRepository(HistorialRastreo);

    async create(rastreoData: DeepPartial<HistorialRastreo>): Promise<HistorialRastreo> {
        const rastreo = this.repository.create(rastreoData);
        return await this.repository.save(rastreo);
    }
}

export const historialRastreoRepository = new HistorialRastreoRepository();