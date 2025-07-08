
import { Router } from "express";
import {  crearProductoSchema, actualizarProductoSchema } from "./product.schema.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { ProductoController } from "./product.controller.js";
export const productRoutes = Router();

productRoutes.post("/", validateSchema(crearProductoSchema), ProductoController.crearProducto);
productRoutes.get("/", ProductoController.obtenerProductos);
productRoutes.get("/:id", ProductoController.obtenerProductoPorId);
productRoutes.patch("/:id", validateSchema(actualizarProductoSchema), ProductoController.actualizarProductoPorId);
productRoutes.delete("/:id", ProductoController.eliminarProductoPorId);
