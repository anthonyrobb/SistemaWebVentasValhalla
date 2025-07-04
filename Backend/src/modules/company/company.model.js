import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { bufferToUuid } from '../../utils/uuid.utils.js';
export class Empresa extends Model {}

Empresa.init({
  id_empresa: {
    type: DataTypes.BLOB('tiny'), // UUID en formato BINARY(16)
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
     get() {
      const value = this.getDataValue('id_empresa');
      return value ? bufferToUuid(value) : null;
    }
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  RUC: {
    type: DataTypes.STRING(25),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Empresa',
  tableName: 'empresa',
  timestamps: false
});
