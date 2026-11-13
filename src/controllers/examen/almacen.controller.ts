import { Request, Response } from "express";
import { almacenService } from "../../services/examen/almacen.service.js";
import { almacenRepository } from "../../repository/examen/AlmacenRepository.js";

const error500 = (res: Response, e: unknown) =>
    res.status(500).json({ error: (e as Error).message });

const esErrorTrigger = (e: any) => e?.driverError?.sqlState === "45000";

// POST /api/almacenes/:id/paquetes
export const asignarPaqueteAlmacen = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

        const { envioId, peso, dimensiones, contenido } = req.body;
        if (!envioId || peso === undefined || !dimensiones || !contenido) {
            return res.status(400).json({
                error: "Faltan campos: envioId, peso, dimensiones, contenido"
            });
        }

        const almacen = await almacenRepository.findById(id);
        if (!almacen) return res.status(404).json({ error: "Almacén no encontrado" });

        const paquete = await almacenService.asignarPaquete(id, { envioId, peso, dimensiones, contenido });
        return res.status(201).json(paquete);
    } catch (e) {
        if (esErrorTrigger(e)) {
            return res.status(400).json({ error: (e as any).driverError.sqlMessage });
        }
        return error500(res, e);
    }
};