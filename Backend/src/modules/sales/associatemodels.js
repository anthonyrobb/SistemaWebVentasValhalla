import { Usuario } from "../users/user.model.js";
import { Producto } from "../product/product.model.js";
import { Cliente } from "../client/client.model.js";
import { Venta } from "./sales.model.js";
import { DetalleVenta } from "../detailsales/detailsales.model.js";
import { MetodoDePago } from "../payment/paymentMethod.model.js";

export function associateSalessModels() {
  Venta.belongsTo(Cliente, {
    foreignKey: "id_cliente",
    as: "cliente"
  });

  Venta.belongsTo(Usuario, {
    foreignKey: "id_vendedor",
    as: "vendedor"
  });

  Venta.belongsTo(MetodoDePago, {
    foreignKey: "id_metodo_de_pago",
    as: "metodo_de_pago"
  });

  Venta.hasMany(DetalleVenta, {
    foreignKey: "id_venta",
    as: "detalles",
    onDelete: "CASCADE"
  });

  DetalleVenta.belongsTo(Venta, {
    foreignKey: "id_venta",
    as: "venta"
  });

  DetalleVenta.belongsTo(Producto, {
    foreignKey: "id_producto",
    as: "producto"
  });
}
