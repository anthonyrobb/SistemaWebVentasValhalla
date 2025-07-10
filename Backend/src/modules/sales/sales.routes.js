
import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";   
import { crearVentaSchema, actualizarVentaSchema } from "./sales.schema.js";
import { SalesController } from "./sales.controller.js";

export const salesRoutes = Router();

salesRoutes.post("/", validateSchema(crearVentaSchema), SalesController.crearVenta);
salesRoutes.delete("/:id", SalesController.eliminarVenta);

salesRoutes.get("/", SalesController.obtenerVentas);
salesRoutes.get("/:id", SalesController.obtenerVentaPorId);
//salesRoutes.patch("/:id", validateSchema(actualizarVentaSchema), SalesController.actualizarVenta);
