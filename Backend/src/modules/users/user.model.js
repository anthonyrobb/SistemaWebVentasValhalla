import { sequelize } from "../../config/database.js";
import { DataTypes, Model } from "sequelize";
import { bufferToUuid } from '../../utils/uuid.utils.js';

import {RolDeUsuario} from '../rol/rol.model.js';
import {TipoDeDocumento} from '../typeDocument/typeDocument.model.js';

export class Usuario extends Model {}

Usuario.init({
  id_usuario: {
    type: DataTypes.BLOB('tiny'), // UUID en formato BINARY(16)
    primaryKey: true,
    allowNull: false,
    get() {
      const value = this.getDataValue('id_usuario');
      return value ? bufferToUuid(value) : null;
    }
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  documento_identidad: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(9),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  id_rol_de_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RolDeUsuario,
      key: 'id_rol_de_usuario'
    }
  },
  id_tipo_de_documento: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: TipoDeDocumento,
      key: 'id_tipo_de_documento'
    }
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: false
});

// Relaciones
Usuario.belongsTo(RolDeUsuario, {
  foreignKey: 'id_rol_de_usuario',
  as: 'rol'
});

Usuario.belongsTo(TipoDeDocumento, {
  foreignKey: 'id_tipo_de_documento',
  as: 'tipoDocumento'
});
