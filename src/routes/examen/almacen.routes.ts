import { Router } from "express";
import { asignarPaqueteAlmacen } from "../../controllers/examen/almacen.controller.js";

const router = Router();

router.post("/:id/paquetes", asignarPaqueteAlmacen);

export default router;