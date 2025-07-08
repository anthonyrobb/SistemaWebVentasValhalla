import { ComprasService } from "./buys.service.js";

export const ComprasController = {
  async crearCompra (req, res) {
    try {
      const compra = await ComprasService.crearCompra(req.body);
      res.status(201).json({ message: "Compra registrada con éxito", compra });
    } catch (error) {
      console.error("Error al crear compra:", error);
      res.status(500).json({ message: "Error al registrar la compra" });
    }
  },

  async obtenerCompras (req, res){
    try {
        console.log("Obteniendo todas las compras");
      const compras = await ComprasService.obtenerCompras();
      res.json(compras);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener compras" });
    }
  },
  async obtenerCompraPorId (req, res) {
    try {
      const id = req.params.id;
      const compra = await ComprasService.obtenerCompraPorId(id);
      if (!compra) {
        return res.status(404).json({ message: "Compra no encontrada" });
      }
      res.json(compra);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la compra" });
    }
  },
  async eliminarCompraPorId(req, res) {
  try {
    const id = req.params.id;
    await ComprasService.eliminarCompra(id);
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la compra" });
  }
}

};
