import { Router } from 'express';

import { userRoutes } from './modules/users/user.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { companyRoutes } from './modules/company/company.routes.js';
import { verifyToken } from './middlewares/verifyToken.js';
import { providerRoutes } from './modules/provider/provider.routes.js';
import { ProductRoutes } from './modules/product/product.routes.js';
export const routes = Router();

routes.use('/users', verifyToken(['administrador']), userRoutes);
routes.use('/auth', authRoutes);
routes.use('/companies', verifyToken(['administrador']), companyRoutes);
routes.use('/products', verifyToken(['administrador']), ProductRoutes);
routes.use('/providers', verifyToken(['administrador']), providerRoutes);
