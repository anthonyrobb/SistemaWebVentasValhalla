import { z } from 'zod';

export const crearClienteSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es obligatorio' }).max(45),
  apellidos: z.string().min(1, { message: 'Los apellidos son obligatorios' }).max(45),
  telefono: z.string().length(9).optional(),
  email: z.string().email({ message: 'Correo inválido' }).max(45).optional(),
  id_tipo_de_documento: z.number().int().positive(),
  numero_doc_identidad: z.string().min(1).max(20),
  fecha_alta: z.coerce.date().optional()
});
export const actualizarClienteSchema = z.object({
  nombre: z.string().max(45).optional(),
  apellidos: z.string().max(45).optional(),
  telefono: z.string().length(9).optional(),
  email: z.string().email({ message: 'Correo inválido' }).max(45).optional(),
  id_tipo_de_documento: z.number().int().positive().optional(),
  numero_doc_identidad: z.string().max(20).optional(),
  fecha_alta: z.coerce.date().optional()
}).partial();