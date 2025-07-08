
import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { crearClienteSchema, actualizarClienteSchema} from "./client.schema.js";
import { ClienteController } from "./client.controller.js";
export const clientRoutes = Router();

clientRoutes.post("/", validateSchema(crearClienteSchema), ClienteController.crearCliente);
clientRoutes.get("/", ClienteController.obtenerClientes);
clientRoutes.get("/:id", ClienteController.obtenerClientePorId);
clientRoutes.patch("/:id", validateSchema(actualizarClienteSchema), ClienteController.actualizarClientePorId);
clientRoutes.delete("/:id", ClienteController.eliminarClientePorId);
