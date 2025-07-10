import { Venta } from "./sales.model.js";
import { DetalleVenta } from "../detailsales/detailsales.model.js";
import { Producto } from "../product/product.model.js";
import { Usuario } from "../users/user.model.js";
import { Cliente } from "../client/client.model.js";
import { uuidToBuffer } from "../../utils/uuid.utils.js";
import { sequelize } from "../../config/database.js";

export const SalesService = {
   async crearVenta(data) {
    const {
      id_vendedor,
      id_cliente,
      tipo_comprobante,
      tipo_de_venta,
      codigo_comprobante,
      id_metodo_de_pago,
      productos
    } = data;

    const resultado = await sequelize.transaction(async (t) => {
      const venta = await Venta.create({
        id_cliente: id_cliente ? uuidToBuffer(id_cliente) : null,
        tipo_comprobante,
        codigo_comprobante,
        fecha_venta: new Date(),
        total: 0,
        id_vendedor: uuidToBuffer(id_vendedor),
        id_metodo_de_pago,
        tipo_de_venta
      }, { transaction: t });

      let detalles = [];
      try {
        detalles = await Promise.all(productos.map(async (p) => {
          const productoDb = await Producto.findByPk(uuidToBuffer(p.id_producto), { transaction: t });

          if (!productoDb) throw new Error(`Producto con ID ${p.id_producto} no encontrado.`);
          if (productoDb.stock < p.cantidad) throw new Error(`Stock insuficiente para ${p.id_producto}`);

          await productoDb.update({ stock: productoDb.stock - p.cantidad }, { transaction: t });

          const detalle = await DetalleVenta.create({
            id_venta: venta.id_venta,
            id_producto: uuidToBuffer(p.id_producto),
            cantidad: p.cantidad,
            precio_actual: productoDb.precio_de_venta
          }, { transaction: t });

          return await detalle.reload({ transaction: t });
        }));
      } catch (error) {
        console.error("Error al crear la venta:", error);
        throw new Error("Error al crear la venta: " + error.message);
      }

      const totalFinal = detalles.reduce((acc, d) => acc + parseFloat(d.sub_total), 0);
      await venta.update({ total: totalFinal }, { transaction: t });

      const ventaFinal = venta.toJSON();
      ventaFinal.detalles = detalles.map(d => d.toJSON());

      return ventaFinal;
    });

    return resultado;
  },


  async obtenerVentas() {
    return await Venta.findAll({
      include: [
        {
          model: Usuario,
          as: "vendedor",
          attributes: ["nombre", "apellidos", "email"],
        },
        {
          model: Cliente,
          as: "cliente",
          attributes: ["nombre", "apellidos", "email"],
        },
        { model: DetalleVenta, as: "detalles" },
      ],
    });
  },
  async obtenerVentaPorId(id) {
    const venta = await Venta.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: "vendedor",
          attributes: ["nombre", "apellidos", "email"],
        },
        {
          model: Cliente,
          as: "cliente",
          attributes: ["nombre", "apellidos", "email"],
        },
        { model: DetalleVenta, as: "detalles" },
      ],
    });
    if (!venta) throw new Error("Venta no encontrada");
    return venta;
  },

  async eliminarVenta(id) {
    const venta = await Venta.findByPk(id);
    if (!venta) throw new Error("Venta no encontrada");
    await venta.destroy();
  }
};
