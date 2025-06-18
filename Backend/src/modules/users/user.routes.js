import { Router } from "express";
import {  crearUsuarioSchema, actualizarUsuarioSchema } from "./user.schema.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { UsuarioController } from "./user.controller.js";
export const userRoutes = Router();

userRoutes.post("/", validateSchema(crearUsuarioSchema), UsuarioController.crearUsuario);
userRoutes.get("/", UsuarioController.obtenerUsuarios);
userRoutes.get("/:id", UsuarioController.obtenerUsuarioPorId);
userRoutes.patch("/:id", validateSchema(actualizarUsuarioSchema), UsuarioController.actualizarUsuarioPorId);
userRoutes.delete("/:id", UsuarioController.eliminarUsuarioPorId);
