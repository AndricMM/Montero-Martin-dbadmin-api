import { Router } from "express";
import { getEnviosCliente } from "../../controllers/examen/cliente.controller.js";

const router = Router();

router.get("/:id/envios", getEnviosCliente);

export default router;