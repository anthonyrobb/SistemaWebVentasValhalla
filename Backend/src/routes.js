import { Router } from 'express';

import { userRoutes } from './modules/users/user.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';

export const routes = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

