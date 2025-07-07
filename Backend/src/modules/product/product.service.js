import { v4 as uuidv4 } from 'uuid';
import { Producto } from './product.model.js';
import { uuidToBuffer } from '../../utils/uuid.utils.js'; // Si tienes helper
import {CategoriaDeProducto } from '../category/category.model.js';

export const ProductoService = {
  async crearProducto(data) {
    const {
      nombre,
      codigo,
      precio_de_venta,
      id_categoria_de_producto,
      stock
    } = data;

    const nuevoProducto = await Producto.create({
      id_producto: uuidToBuffer(uuidv4()),
      nombre,
      codigo,
      precio_de_venta,
      stock,
      id_categoria_de_producto
    });

    return nuevoProducto;
  },

  async obtenerProductos() {
    const productos = await Producto.findAll(
        {
            attributes: { exclude: ['id_categoria_de_producto'] },
            include: [
                {
                model: CategoriaDeProducto,
                as: 'CategoriaDeProducto',
                attributes: ['id_categoria_de_producto', 'nombre']
                }
            ]
        }
    );
    return productos;
  },

  async obtenerProductoPorId(id) {
    const producto = await Producto.findByPk(uuidToBuffer(id), {
        attributes: { exclude: ['id_categoria_de_producto'] },
        include: [
            {
            model: CategoriaDeProducto,
            as: 'CategoriaDeProducto',
            attributes: ['id_categoria_de_producto', 'nombre']
            }
        ]
    });
    return producto ? producto.get({ plain: true }) : null;
  },

  async actualizarProductoPorId(id, data) {
    const producto = await Producto.findByPk(uuidToBuffer(id));
    if (!producto) return null;

    await producto.update(data);
    return producto.get({ plain: true });
  },

  async eliminarProductoPorId(id) {
    const producto = await Producto.findByPk(uuidToBuffer(id));
    if (!producto) return null;

    await producto.destroy();
    return true;
  }
};