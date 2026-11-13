import { Paquete } from "../../entity/examen/Paquete.js";
import { paqueteRepository } from "../../repository/examen/PaqueteRepository.js";

export interface PaqueteAlmacenInput {
    envioId: number;
    peso: number;
    dimensiones: string;
    contenido: string;
}

export class AlmacenService {
    async asignarPaquete(almacenId: number, data: PaqueteAlmacenInput): Promise<Paquete | null> {
        const paquete = await paqueteRepository.create({
            envio: { id: data.envioId },
            almacen: { id: almacenId },
            peso: data.peso,
            dimensiones: data.dimensiones,
            contenido: data.contenido
        });
        return await paqueteRepository.findById(paquete.id);
    }
}

export const almacenService = new AlmacenService();