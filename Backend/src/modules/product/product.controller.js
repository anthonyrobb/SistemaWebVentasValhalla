import { ProductoService } from "./product.service.js";

export const ProductoController = {
  async crearProducto(req, res) {
    try {
      const nuevoProducto = await ProductoService.crearProducto(req.body);
      return res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error("Error al crear producto:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async obtenerProductos(req, res) {
    try {
      const productos = await ProductoService.obtenerProductos();
      return res.status(200).json(productos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async obtenerProductoPorId(req, res) {
    try {
      const { id } = req.params;
      const producto = await ProductoService.obtenerProductoPorId(id);
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      return res.status(200).json(producto);
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async actualizarProductoPorId(req, res) {
    try {
      const { id } = req.params;
      const productoActualizado = await ProductoService.actualizarProductoPorId(
        id,
        req.body
      );
      if (!productoActualizado) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      return res.status(200).json(productoActualizado);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async eliminarProductoPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await ProductoService.eliminarProductoPorId(id);
      if (!resultado) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  }
};
