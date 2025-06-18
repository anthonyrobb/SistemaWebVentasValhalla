// src/modules/tipoDeDocumento/tipoDeDocumento.model.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';

export class TipoDeDocumento extends Model {}

TipoDeDocumento.init({
  id_tipo_de_documento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false 
  },
  descripcion: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'TipoDeDocumento',
  tableName: 'tipo_de_documento',
  timestamps: false
});
