import { z } from 'zod';

export const crearUsuarioSchema = z.object({
  nombre: z.string({ required_error: 'El nombre es obligatorio' }).min(1, 'El nombre no puede estar vacío'),
  apellidos: z.string({ required_error: 'Los apellidos son obligatorios' }).min(1),
  email: z.string({ required_error: 'El correo es obligatorio' }).email('Formato de correo inválido'),
  telefono: z.string({ required_error: 'El teléfono es obligatorio' }).length(9, 'Debe tener 9 dígitos'),
  documento_identidad: z.string({ required_error: 'El documento es obligatorio' }).min(6).max(20),
  password: z.string({ required_error: 'La contraseña es obligatoria' }).min(6, 'Debe tener mínimo 6 caracteres'),
  id_rol_de_usuario: z.number({ required_error: 'El rol es obligatorio' }).int().positive(),
  id_tipo_de_documento: z.number({ required_error: 'El tipo de documento es obligatorio' }).int().positive(),
});
export const actualizarUsuarioSchema = crearUsuarioSchema.partial();