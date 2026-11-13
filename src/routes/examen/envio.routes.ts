import { Router } from "express";
import { createEnvio, updateCostoEnvio, agregarRastreoEnvio, getEnviosActivos } from "../../controllers/examen/envio.controller.js";

const router = Router();

router.get("/", getEnviosActivos);
router.post("/", createEnvio);
router.put("/:id/costo", updateCostoEnvio);
router.post("/:id/rastreo", agregarRastreoEnvio);

export default router;