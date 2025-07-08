import { Compra } from "./buys.model.js";
import { DetalleCompra } from "./../buyDetails/buyDetail.model.js";
import { Usuario } from "../users/user.model.js";
import { Proveedor } from "../provider/provider.model.js";
import { uuidToBuffer, bufferToUuid } from "./../../utils/uuid.utils.js"; // función para convertir a BINARY(16)
import { sequelize } from "../../config/database.js";
import { Producto } from "../product/product.model.js";

export const ComprasService = {
  async crearCompra(data) {
    const { id_usuario, id_proveedor, tipo_de_comprobante, productos } = data;

    const totalCalculado = productos.reduce((acc, prod) => {
      return acc + prod.cantidad * prod.precio_unidad;
    }, 0);

    const resultado = await sequelize.transaction(async (t) => {
      const compra = await Compra.create(
        {
          id_usuario: uuidToBuffer(id_usuario),
          id_proveedor: uuidToBuffer(id_proveedor),
          fecha: new Date(),
          tipo_de_comprobante,
          total: 0, // se actualizará luego
        },
        { transaction: t }
      );

      const detalles = await Promise.all(
        productos.map(async (producto) => {
          const detalle = await DetalleCompra.create(
            {
              id_compra: compra.id_compra,
              id_producto: uuidToBuffer(producto.id_producto),
              cantidad: producto.cantidad,
              precio_unidad: producto.precio_unidad,
            },
            { transaction: t }
          );

          const productoDb = await Producto.findByPk(
            uuidToBuffer(producto.id_producto),
            { transaction: t }
          );

          if (!productoDb) {
            throw new Error(
              `Producto con ID ${producto.id_producto} no encontrado`
            );
          }

          await productoDb.update(
            { stock: productoDb.stock + producto.cantidad },
            { transaction: t }
          );

          return detalle;
        })
      );

      await compra.update({ total: totalCalculado }, { transaction: t });

      // Usa toJSON para aplicar getters y devolver un objeto limpio
      const compraFinal = compra.toJSON();
      compraFinal.detalles = detalles.map((d) => d.toJSON());

      return compraFinal;
    });

    return resultado;
  },

  async obtenerCompras() {
    try {
      const compras = await Compra.findAll({
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: ["nombre", "apellidos", "email"],
          },
          {
            model: Proveedor,
            as: "proveedor",
            attributes: ["nombre", "apellidos", "email"],
          },
          {
            model: DetalleCompra,
            as: "detalles",
          },
        ],
      });

      return compras;
    } catch (error) {
      console.error("Error al obtener las compras:", error);
      throw new Error("No se pudieron obtener las compras");
    }
  },

  async obtenerCompraPorId(id) {
    const compra = await Compra.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["nombre", "apellidos", "email"],
        },
        {
          model: Proveedor,
          as: "proveedor",
          attributes: ["nombre", "apellidos", "email"], // solo si quieres campos específicos
        },
        {
          model: DetalleCompra,
          as: "detalles",
        },
      ],
    });
    if (!compra) throw new Error("Compra no encontrada");
    return compra;
  },
  async eliminarCompra(id) {
    const compra = await Compra.findByPk(id);
    if (!compra) throw new Error("Compra no encontrada");

    await compra.destroy();
  },
};
