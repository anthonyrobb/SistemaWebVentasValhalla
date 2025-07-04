import { UsuarioService } from "./user.service.js";

export const UsuarioController = {
  async crearUsuario(req, res) {
    try {
      const nuevoUsuario = await UsuarioService.crearUsuario(req.body);
      return res.status(201).json(nuevoUsuario);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.obtenerUsuarios();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async obtenerUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.obtenerUsuarioPorId(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      
      return res.status(200).json(usuario);
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async actualizarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuarioActualizado = await UsuarioService.actualizarUsuarioPorId(
        id,
        req.body
      );
      if (!usuarioActualizado) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      return res.status(200).json(usuarioActualizado);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async eliminarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await UsuarioService.eliminarUsuarioPorId(id);
      if (!resultado) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  }
};
