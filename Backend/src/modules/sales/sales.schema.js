import { z } from 'zod';

export const crearVentaSchema = z.object({
  id_vendedor: z.string()
    .uuid({ message: 'El ID del vendedor debe ser un UUID válido' }),

  id_cliente: z.string()
    .uuid({ message: 'El ID del cliente debe ser un UUID válido' })
    .nullable()
    .optional(),

  tipo_comprobante: z.enum(['BOLETA', 'FACTURA'], {
    required_error: 'Debes indicar el tipo de comprobante'
  }),

  tipo_de_venta: z.enum(['PRESENCIAL', 'ONLINE'], {
    required_error: 'Debes indicar el tipo de venta'
  }),

  codigo_comprobante: z.string()
    .max(30, { message: 'El código del comprobante no debe exceder los 30 caracteres' }),

  id_metodo_de_pago: z.number()
    .int({ message: 'El ID del método de pago debe ser un número entero' }),

  productos: z.array(
    z.object({
      id_producto: z.string().uuid({ message: 'ID del producto inválido' }),
      cantidad: z.number()
        .int({ message: 'La cantidad debe ser un número entero' })
        .positive({ message: 'La cantidad debe ser mayor que cero' })
    }).strict()
  ).min(1, { message: 'Debes incluir al menos un producto' }),
});

export const actualizarVentaSchema = z.object({
  id_venta: z.number()
    .int({ message: 'El ID de la venta debe ser un número entero' })
    .positive({ message: 'El ID de la venta debe ser positivo' }),

  id_vendedor: z.string()
    .uuid({ message: 'El ID del vendedor debe ser un UUID válido' })
    .optional(),

  id_cliente: z.string()
    .uuid({ message: 'El ID del cliente debe ser un UUID válido' })
    .nullable()
    .optional(),

  tipo_de_comprobante: z.enum(['BOLETA', 'FACTURA'])
    .optional(),

  tipo_de_venta: z.enum(['presencial', 'online'])
    .optional(),

  codigo_comprobante: z.string()
    .max(30, { message: 'El código del comprobante no debe exceder los 30 caracteres' })
    .optional(),

  id_metodo_de_pago: z.number()
    .int({ message: 'El ID del método de pago debe ser un número entero' })
    .optional(),

  detalles: z.array(
    z.object({
      id_producto: z.string().uuid({ message: 'ID del producto inválido' }),
      cantidad: z.number()
        .int({ message: 'La cantidad debe ser un número entero' })
        .positive({ message: 'La cantidad debe ser mayor que cero' })
    }).strict()
  ).optional(),

});