
import { Router } from "express";
import {  crearProductoSchema, actualizarProductoSchema } from "./product.schema.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { ProductoController } from "./product.controller.js";
export const ProductRoutes = Router();

ProductRoutes.post("/", validateSchema(crearProductoSchema), ProductoController.crearProducto);
ProductRoutes.get("/", ProductoController.obtenerProductos);
ProductRoutes.get("/:id", ProductoController.obtenerProductoPorId);
ProductRoutes.patch("/:id", validateSchema(actualizarProductoSchema), ProductoController.actualizarProductoPorId);
ProductRoutes.delete("/:id", ProductoController.eliminarProductoPorId);
