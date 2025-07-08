
import { Compra } from "../buys/buys.model.js";
import { DetalleCompra } from "../buyDetails/buyDetail.model.js";
import { Usuario } from "../users/user.model.js";
import { Proveedor } from "../provider/provider.model.js";
import { Producto } from "../product/product.model.js";

export function associateBuysModels() {
  // Compra -> DetalleCompra
  Compra.hasMany(DetalleCompra, {
    foreignKey: 'id_compra',
    as: 'detalles',
    onDelete: 'CASCADE'
  });

  DetalleCompra.belongsTo(Compra, {
    foreignKey: 'id_compra',
    as: 'compra',
    onDelete: 'CASCADE'
  });

  // Compra -> Usuario
  Compra.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuario'
  });

  // Compra -> Proveedor
  Compra.belongsTo(Proveedor, {
    foreignKey: 'id_proveedor',
    as: 'proveedor'
  });

  // DetalleCompra -> Producto
  DetalleCompra.belongsTo(Producto, {
    foreignKey: 'id_producto',
    as: 'producto'
  });
}
