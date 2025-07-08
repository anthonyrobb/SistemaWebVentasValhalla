import { sequelize } from './database.js';

// Modelos con initModel
import { Compra } from './../modules/buys/buys.model.js';
import { DetalleCompra } from './../modules/buyDetails/buyDetail.model.js';

import { associateBuysModels } from './../modules/buys/associateModels.js';

export async function initializeDatabaseRelations() {
  // Inicializas solo los modelos con initModel
  Compra.initModel(sequelize);
  DetalleCompra.initModel(sequelize);

  // Luego relaciones
  associateBuysModels();

  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a base de datos exitosa');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
}
