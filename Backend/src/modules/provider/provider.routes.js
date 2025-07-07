import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { crearProveedorSchema, actualizarProveedorSchema } from "./provider.schema.js";
import { ProveedorController } from "./provider.controller.js";
export const providerRoutes = Router();

providerRoutes.post("/", validateSchema(crearProveedorSchema), ProveedorController.crearProveedor);
providerRoutes.get("/", ProveedorController.obtenerProveedores);
providerRoutes.get("/:id", ProveedorController.obtenerProveedorPorId);
providerRoutes.patch("/:id", validateSchema(actualizarProveedorSchema), ProveedorController.actualizarProveedorPorId);
providerRoutes.delete("/:id", ProveedorController.eliminarProveedorPorId);
