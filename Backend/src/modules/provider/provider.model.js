import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { TipoDeDocumento } from '../typeDocument/typeDocument.model.js';
import { Empresa } from '../company/company.model.js';
import { bufferToUuid } from '../../utils/uuid.js';
export class Proveedor extends Model {}

Proveedor.init({
  id_proveedores: {
    type:  DataTypes.BLOB('tiny'),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    get() {
      const value = this.getDataValue('id_proveedores');
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
  numero_doc_identidad: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(9),
    allowNull: false
  },
  id_tipo_de_documento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoDeDocumento,
      key: 'id_tipo_de_documento'
    }
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empresa,
      key: 'id_empresa'
    }
  }
}, {
  sequelize,
  modelName: 'Proveedor',
  tableName: 'proveedor',
  timestamps: false
});

// Relaciones
Proveedor.belongsTo(TipoDeDocumento, {
  foreignKey: 'id_tipo_de_documento',
  as: 'tipoDeDocumento'
});

Proveedor.belongsTo(Empresa, {
  foreignKey: 'id_empresa',
  as: 'empresa'
});
