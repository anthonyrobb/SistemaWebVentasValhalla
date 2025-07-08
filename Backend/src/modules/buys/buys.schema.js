import {z } from 'zod';
import { precioDeVentaSchema } from '../product/product.schema.js';

export const crearCompraSchema = z.object({
  id_usuario: z.string().uuid(),
  id_proveedor: z.string().uuid(),
  tipo_de_comprobante: z.enum(['BOLETA', 'FACTURA', 'TICKET']),
  productos: z.array(
    z.object({
      id_producto: z.string().uuid(),
      cantidad: z.number().int().positive(),
      precio_unidad: precioDeVentaSchema
    }).strict()
  ).min(1)
});
