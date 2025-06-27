import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { authSchema } from './auth.schema.js';
import { AuthController } from './auth.controller.js';

export const authRoutes = Router();

authRoutes.post("/login", validateSchema(authSchema), AuthController.login);
