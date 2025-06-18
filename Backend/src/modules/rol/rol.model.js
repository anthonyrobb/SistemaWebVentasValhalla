// src/modules/rol/rol.model.js
import { DataTypes, Model } from 'sequelize';
import  { sequelize } from '../../config/database.js';

export class RolDeUsuario extends Model {}

RolDeUsuario.init({
  id_rol_de_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(30)
  }
}, {
  sequelize,
  modelName: 'RolDeUsuario',
  tableName: 'rol_de_usuario',
  timestamps: false
});

