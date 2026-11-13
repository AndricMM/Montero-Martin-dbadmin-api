import { Request, Response } from "express";
import { envioService } from "../../services/examen/envio.service.js";
import { envioRepository } from "../../repository/examen/EnvioRepository.js";

const error500 = (res: Response, e: unknown) =>
    res.status(500).json({ error: (e as Error).message });

const esErrorTrigger = (e: any) => e?.driverError?.sqlState === "45000";

// POST /api/envios
export const createEnvio = async (req: Request, res: Response) => {
    try {
        const {
            remitenteId,
            destinatarioId,
            direccionOrigenId,
            direccionDestinoId,
            costo_total,
            paquetes
        } = req.body;

        if (!remitenteId || !destinatarioId || !direccionOrigenId || !direccionDestinoId || costo_total === undefined) {
            return res.status(400).json({
                error: "Faltan campos: remitenteId, destinatarioId, direccionOrigenId, direccionDestinoId, costo_total"
            });
        }

        if (!Array.isArray(paquetes) || paquetes.length === 0) {
            return res.status(400).json({ error: "El envío debe tener al menos un paquete" });
        }

        const envio = await envioService.crearEnvio({
            remitenteId,
            destinatarioId,
            direccionOrigenId,
            direccionDestinoId,
            costo_total,
            paquetes
        });
        return res.status(201).json(envio);
    } catch (e) {
        if (esErrorTrigger(e)) {
            return res.status(400).json({ error: (e as any).driverError.sqlMessage });
        }
        return error500(res, e);
    }
};

// PUT /api/envios/:id/costo
export const updateCostoEnvio = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

        const { costo_total } = req.body;
        if (costo_total === undefined || isNaN(Number(costo_total))) {
            return res.status(400).json({ error: "Falta el campo: costo_total" });
        }

        const existe = await envioRepository.findById(id);
        if (!existe) return res.status(404).json({ error: "Envío no encontrado" });

        const envio = await envioService.actualizarCosto(id, Number(costo_total));
        return res.json(envio);
    } catch (e) {
        return error500(res, e);
    }
};

// POST /api/envios/:id/rastreo
export const agregarRastreoEnvio = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

        const { ubicacion_actual, estado_evento, observaciones } = req.body;
        if (!ubicacion_actual || !estado_evento) {
            return res.status(400).json({ error: "Faltan campos: ubicacion_actual, estado_evento" });
        }

        const estadosValidos = ["REGISTRADO", "EN_TRANSITO", "ENTREGADO", "CANCELADO"];
        if (!estadosValidos.includes(estado_evento)) {
            return res.status(400).json({ error: `estado_evento debe ser: ${estadosValidos.join(", ")}` });
        }

        const existe = await envioRepository.findById(id);
        if (!existe) return res.status(404).json({ error: "Envío no encontrado" });

        const envio = await envioService.agregarRastreo(id, { ubicacion_actual, estado_evento, observaciones });
        return res.status(201).json(envio);
    } catch (e) {
        return error500(res, e);
    }
};

// GET /api/envios
export const getEnviosActivos = async (_req: Request, res: Response) => {
    try {
        const envios = await envioService.listarActivos();
        return res.json(envios);
    } catch (e) {
        return error500(res, e);
    }
};