import { ClienteService } from "./client.service.js";

export const ClienteController = {
  async crearCliente(req, res) {
    try {
      const nuevoCliente = await ClienteService.crearCliente(req.body);
      return res.status(201).json(nuevoCliente);
    } catch (error) {
      console.error("Error al crear cliente:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async obtenerClientes(req, res) {
    try {
      const clientes = await ClienteService.obtenerClientes();
      return res.status(200).json(clientes);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async obtenerClientePorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await ClienteService.obtenerClientePorId(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      return res.status(200).json(cliente);
    } catch (error) {
      console.error("Error al obtener cliente por ID:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async actualizarClientePorId(req, res) {
    try {
      const { id } = req.params;
      const clienteActualizado = await ClienteService.actualizarClientePorId(
        id,
        req.body
      );
      if (!clienteActualizado) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      return res.status(200).json(clienteActualizado);
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async eliminarClientePorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await ClienteService.eliminarClientePorId(id);
      if (!resultado) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  }
};
