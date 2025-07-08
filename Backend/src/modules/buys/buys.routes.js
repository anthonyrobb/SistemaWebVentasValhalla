
import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { crearCompraSchema } from "./buys.schema.js";
import { ComprasController } from "./buys.controller.js";
export const buysRoutes = Router();

buysRoutes.post("/", validateSchema(crearCompraSchema), ComprasController.crearCompra);
buysRoutes.get("/", ComprasController.obtenerCompras);
buysRoutes.get("/:id", ComprasController.obtenerCompraPorId);
buysRoutes.delete("/:id", ComprasController.eliminarCompraPorId);
