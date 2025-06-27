import { Router } from 'express';

import { userRoutes } from './modules/users/user.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { verifyToken } from './middlewares/verifyToken.js';

export const routes = Router();

routes.use('/users', verifyToken(['administrador']), userRoutes);
routes.use('/auth', authRoutes);

