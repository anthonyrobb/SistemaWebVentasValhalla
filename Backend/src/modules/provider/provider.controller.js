import { ProveedorService } from "./provider.service.js";

export const ProveedorController = {
  async crearProveedor(req, res) {
    try {
      const nuevoProveedor = await ProveedorService.crearProveedor(req.body);
      return res.status(201).json(nuevoProveedor);
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async obtenerProveedores(req, res) {
    try {
      const proveedores = await ProveedorService.obtenerProveedores();
      return res.status(200).json(proveedores);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async obtenerProveedorPorId(req, res) {
    try {
      const { id } = req.params;
      const proveedor = await ProveedorService.obtenerProveedorPorId(id);
      if (!proveedor) {
        return res.status(404).json({ error: "Proveedor no encontrado" });
      }

      return res.status(200).json(proveedor);
    } catch (error) {
      console.error("Error al obtener proveedor por ID:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async actualizarProveedorPorId(req, res) {
    try {
      const { id } = req.params;
      const proveedorActualizado = await ProveedorService.actualizarProveedorPorId(
        id,
        req.body
      );
      if (!proveedorActualizado) {
        return res.status(404).json({ error: "Proveedor no encontrado" });
      }
      return res.status(200).json(proveedorActualizado);
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async eliminarProveedorPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await ProveedorService.eliminarProveedorPorId(id);
      if (!resultado) {
        return res.status(404).json({ error: "Proveedor no encontrado" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  }
};
