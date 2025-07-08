import { z } from 'zod';
export const precioDeVentaSchema = z.preprocess(
  (input) => {
    if (typeof input === 'string' || typeof input === 'number') {
      const parsed = parseFloat(input.toString());
      return isNaN(parsed) ? input : parsed;
    }
    return input;
  },
  z.number()
    .nonnegative({ message: 'El precio no puede ser negativo' })
    .refine((num) => {
      const [intPart, decimalPart] = num.toString().split('.');
      const totalLength = intPart.length + (decimalPart?.length ?? 0);
      return totalLength <= 10 && (decimalPart?.length ?? 0) <= 2;
    }, {
      message: 'El precio debe tener máximo 10 dígitos en total y hasta 2 decimales',
    })
).optional();

export const crearProductoSchema = z.object({
  nombre: z.string().max(45),
  codigo: z.string().max(13),
  precio_de_venta: precioDeVentaSchema,
  id_categoria_de_producto: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative()
});
export const actualizarProductoSchema = z.object({
  nombre: z.string().max(45).optional(),
  codigo: z.string().max(13).optional(),
  precio_de_venta: precioDeVentaSchema,
  id_categoria_de_producto: z.number().int().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional()
}).partial();

