import { Model, DataTypes } from 'sequelize';

export class MetodoDePago extends Model {
  static initModel(sequelize) {
    MetodoDePago.init({
      id_metodo_de_pago: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING(15),
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'MetodoDePago',
      tableName: 'metodo_de_pago',
      timestamps: false
    });
  }
}
