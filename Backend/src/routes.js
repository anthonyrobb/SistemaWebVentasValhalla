import { Router } from 'express';

import { userRoutes } from './modules/users/user.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { companyRoutes } from './modules/company/company.routes.js';
import { verifyToken } from './middlewares/verifyToken.js';
import { providerRoutes } from './modules/provider/provider.routes.js';
import { productRoutes } from './modules/product/product.routes.js';
import { buysRoutes } from './modules/buys/buys.routes.js';
import { clientRoutes } from './modules/client/client.routes.js';
export const routes = Router();

routes.use('/users', verifyToken(['administrador']), userRoutes);
routes.use('/auth', authRoutes);
routes.use('/companies', verifyToken(['administrador']), companyRoutes);
routes.use('/products', verifyToken(['administrador']), productRoutes);
routes.use('/providers', verifyToken(['administrador']), providerRoutes);
routes.use('/buys', verifyToken(['administrador']), buysRoutes);
routes.use('/clients', verifyToken(['administrador','vendedor']), clientRoutes);