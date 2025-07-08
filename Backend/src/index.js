import { app } from './app.js';
import { PORT } from './config/PORT.js';
import { initializeDatabaseRelations } from './config/loadDataRelations.js'; // 👈 aquí cargas las relaciones


(async () => {
  await initializeDatabaseRelations(); // 👈 conexión y carga de modelos
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})();
