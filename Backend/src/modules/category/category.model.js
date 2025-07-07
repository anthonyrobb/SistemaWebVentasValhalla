import { sequelize } from "../../config/database.js";
import { DataTypes, Model } from "sequelize";

export class CategoriaDeProducto extends Model {}

CategoriaDeProducto.init({
  id_categoria_de_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'CategoriaDeProducto',
  tableName: 'categoria_de_producto',
  timestamps: false
});

