// src/modules/buys/buy.model.js
import { Model, DataTypes } from "sequelize";
import { bufferToUuid } from "../../utils/uuid.utils.js"; // Funciones para convertir UUID a BINARY(16) y viceversa
export class Compra extends Model {
  static initModel(sequelize) {
    Compra.init(
      {
        id_compra: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        id_usuario: {
          type: DataTypes.BLOB("tiny"), // UUID en formato BINARY(16)
          allowNull: false,
          get() {
            const value = this.getDataValue("id_usuario");
            return value ? bufferToUuid(value) : null;
          },
        },
        id_proveedor: {
          type: DataTypes.BLOB("tiny"), // UUID en formato BINARY(16)
          allowNull: false,
          get() {
            const value = this.getDataValue("id_proveedor");
            return value ? bufferToUuid(value) : null;
          },
        },
        fecha: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        tipo_de_comprobante: {
          type: DataTypes.ENUM("BOLETA", "FACTURA", "TICKET"),
          allowNull: false,
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Compra",
        tableName: "compra",
        timestamps: false,
      }
    );
  }
}
