// src/modules/client/client.model.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { bufferToUuid } from '../../utils/uuid.utils.js';
import { TipoDeDocumento } from '../typeDocument/typeDocument.model.js';

export class Cliente extends Model {}

Cliente.init({
  id_cliente: {
    type: DataTypes.BLOB('tiny'), // UUID en formato BINARY(16)
    primaryKey: true,
    allowNull: false,
    get() {
      const value = this.getDataValue('id_cliente');
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
  telefono: {
    type: DataTypes.STRING(9),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  id_tipo_de_documento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoDeDocumento,
      key: 'id_tipo_de_documento'
    }
  },
  numero_doc_identidad: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  fecha_alta: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Cliente',
  tableName: 'cliente',
  timestamps: false
});

// Relaciones
Cliente.belongsTo(TipoDeDocumento, {
  foreignKey: 'id_tipo_de_documento',
  as: 'tipoDeDocumento'
});
