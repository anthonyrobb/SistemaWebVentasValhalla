import { z } from 'zod';

export const crearProveedorSchema = z.object({
  nombre: z.string().max(45),
  apellidos: z.string().max(45),
  numero_doc_identidad: z.string().max(20),
  email: z.string().email().max(45),
  telefono: z.string().max(9),
  id_tipo_de_documento: z.number({ required_error: 'El tipo de documento es obligatorio' }).int().positive(),
  id_empresa: z.string().uuid(),
});
export const actualizarProveedorSchema = z.object({
  nombre: z.string().max(45).optional(),
  apellidos: z.string().max(45).optional(),
  numero_doc_identidad: z.string().max(20).optional(),
  email: z.string().email().max(45).optional(),
  telefono: z.string().max(9).optional(),
  id_tipo_de_documento: z.number({ required_error: 'El tipo de documento es obligatorio' }).int().positive(),
  id_empresa: z.string().uuid().optional(),
}).partial();
