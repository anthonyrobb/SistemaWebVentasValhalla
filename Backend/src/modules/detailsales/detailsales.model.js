import { Model, DataTypes } from 'sequelize';
import { bufferToUuid } from '../../utils/uuid.utils.js';
export class DetalleVenta extends Model {
  static initModel(sequelize) {
    DetalleVenta.init({
      id_detalle_venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      precio_actual: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      sub_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'DetalleVenta',
      tableName: 'detalle_venta',
      timestamps: false
    });
  }
}