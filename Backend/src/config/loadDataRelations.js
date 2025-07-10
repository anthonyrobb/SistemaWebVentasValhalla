import { sequelize } from './database.js';

// Modelos con initModel
import { Compra } from './../modules/buys/buys.model.js';
import { DetalleCompra } from './../modules/buyDetails/buyDetail.model.js';
import { Venta } from './../modules/sales/sales.model.js';
import { DetalleVenta } from './../modules/detailsales/detailsales.model.js';
import { associateBuysModels } from './../modules/buys/associateModels.js';
import { associateSalessModels } from './../modules/sales/associatemodels.js';
import { MetodoDePago } from '../modules/payment/paymentMethod.model.js';
export async function initializeDatabaseRelations() {
  // Inicializas solo los modelos con initModel
  Compra.initModel(sequelize);
  DetalleCompra.initModel(sequelize);

  // Luego relaciones
  associateBuysModels();
  
  //inicializamos los modelos de ventas
  Venta.initModel(sequelize);
  DetalleVenta.initModel(sequelize);
  MetodoDePago.initModel(sequelize);
  // Asociaciones de ventas
  associateSalessModels();
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a base de datos exitosa');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
}
