import { Router } from "express";
import {  crearUsuarioSchema, actualizarUsuarioSchema } from "./user.schema.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { crearUsuarioController, 
    obtenerUsuarioPorIdController, 
    obtenerUsuariosController, 
    actualizarUsuarioController,
    eliminarUsuarioController
} from "./user.controller.js";
export const userRoutes = Router();

userRoutes.post("/", validateSchema(crearUsuarioSchema), crearUsuarioController);
userRoutes.get("/", obtenerUsuariosController);
userRoutes.get("/:id", obtenerUsuarioPorIdController); 
userRoutes.patch("/:id", validateSchema(actualizarUsuarioSchema), actualizarUsuarioController); 
userRoutes.delete("/:id", eliminarUsuarioController);