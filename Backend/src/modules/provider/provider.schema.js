import { z } from 'zod';

export const proveedorSchema = z.object({
  nombre: z.string().max(45),
  apellidos: z.string().max(45),
  numero_doc_identidad: z.string().max(20),
  email: z.string().email().max(45),
  telefono: z.string().max(9),
  id_tipo_de_documento: z.string().uuid(),
  id_empresa: z.string().uuid(),
});
