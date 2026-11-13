import { Request, Response } from "express";
import { envioService } from "../../services/examen/envio.service.js";
import { clienteRepository } from "../../repository/examen/ClienteRepository.js";

const error500 = (res: Response, e: unknown) =>
    res.status(500).json({ error: (e as Error).message });

// GET /api/clientes/:id/envios
export const getEnviosCliente = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

        const cliente = await clienteRepository.findById(id);
        if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });

        const envios = await envioService.historialPorCliente(id);
        return res.json({ cliente, envios });
    } catch (e) {
        return error500(res, e);
    }
};