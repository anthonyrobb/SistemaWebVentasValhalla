import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {crearEmpresaSchema, actualizarEmpresaSchema} from "./company.schema.js";
import { EmpresaController } from "./company.controller.js";
export const companyRoutes = Router();

companyRoutes.post("/", validateSchema(crearEmpresaSchema), EmpresaController.crearEmpresa);
companyRoutes.get("/", EmpresaController.obtenerEmpresas);
companyRoutes.get("/:id", EmpresaController.obtenerEmpresaPorId);
companyRoutes.patch("/:id", validateSchema(actualizarEmpresaSchema), EmpresaController.actualizarEmpresaPorId);
companyRoutes.delete("/:id", EmpresaController.eliminarEmpresaPorId);
