// src/modules/buyDetails/buyDetail.model.js
import { Model, DataTypes } from "sequelize";
import { bufferToUuid } from "../../utils/uuid.utils.js"; // Funciones para convertir UUID a BINARY(16) y viceversa
export class DetalleCompra extends Model {
  static initModel(sequelize) {
    DetalleCompra.init({
      id_detalle_compra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      id_producto: {
        type: DataTypes.BLOB('tiny'),
        allowNull: false,
        get() {
          const value = this.getDataValue('id_producto');
          return value ? bufferToUuid(value) : null;
        }
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      precio_unidad: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        get() {
          return this.getDataValue('subtotal');
        },
        set() {
          throw new Error('El subtotal se calcula automáticamente en la base de datos.');
        }
      }
    }, {
      sequelize,
      modelName: 'DetalleCompra',
      tableName: 'detalle_compra',
      timestamps: false
    });
  }
}
