import { z } from 'zod';

export const crearEmpresaSchema = z.object({
  id: z.string().uuid().optional(),
  nombre: z.string().max(45),
  RUC: z.string().max(25),
});

export const actualizarEmpresaSchema = z.object({
  id: z.string().uuid(),
  nombre: z.string().max(45).optional(),
  RUC: z.string().max(25).optional(),
}).partial();
