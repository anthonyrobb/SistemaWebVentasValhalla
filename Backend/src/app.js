import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from './routes.js';

export const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/v1/', routes);

// Middleware de manejo de errores
// app.use(errorHandler);

