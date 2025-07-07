import { sequelize } from "../../config/database.js";
import { DataTypes, Model } from "sequelize";
import { CategoriaDeProducto } from '../category/category.model.js';
import { bufferToUuid } from '../../utils/uuid.utils.js';

export class Producto extends Model {}

Producto.init({
  id_producto: {
    type: DataTypes.BLOB('tiny'), // UUID en formato BINARY(16)
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    get() {
          const value = this.getDataValue('id_producto');
          return value ? bufferToUuid(value) : null;
        }
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  codigo: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true
  },
  precio_de_venta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  id_categoria_de_producto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Producto',
  tableName: 'producto',
  timestamps: false
});


// Relación con CategoriaDeProducto
Producto.belongsTo(CategoriaDeProducto, {
  foreignKey: 'id_categoria_de_producto',
  as: 'CategoriaDeProducto'
});

