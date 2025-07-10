import { Model, DataTypes } from 'sequelize';
import { bufferToUuid } from '../../utils/uuid.utils.js';
export class Venta extends Model {
  static initModel(sequelize) {
    Venta.init({
      id_venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      id_cliente: {
        type: DataTypes.BLOB('tiny'),
        allowNull: true,
        get() {
          const value = this.getDataValue('id_cliente');
          return value ? bufferToUuid(value) : null;
        }
      },
      tipo_comprobante: {
        type: DataTypes.ENUM('BOLETA', 'FACTURA'),
        allowNull: false
      },
      codigo_comprobante: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      fecha_venta: {
        type: DataTypes.DATE,
        allowNull: false
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      id_vendedor: {
        type: DataTypes.BLOB('tiny'),
        allowNull: false,
        get() {
          const value = this.getDataValue('id_vendedor');
          return value ? bufferToUuid(value) : null;
        }
      },
      id_metodo_de_pago: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tipo_de_venta: {
        type: DataTypes.ENUM('PRESENCIAL', 'ONLINE'),
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Venta',
      tableName: 'venta',
      timestamps: false
    });
  }
}