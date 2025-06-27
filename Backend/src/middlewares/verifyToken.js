import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import { UsuarioService } from "../modules/users/user.service.js";
import { Usuario } from "../modules/users/user.model.js";
const SECRET = process.env.JWT_SECRET;

export const verifyToken = (rolesPermitidos = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token recibido:", token);
    try {
      const decoded = jwt.verify(token, SECRET);
      console.log("Token decodificado:", decoded.id);
      if (!decoded || !decoded.id) {
        return res.status(401).json({ error: "Token inválido" });
      }
      const usuario = await UsuarioService.obtenerUsuarioPorId(decoded.id);
      console.log("Usuario obtenido:", usuario);
      if (!usuario) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      const rolUsuario = usuario.rol.descripcion.toLowerCase();
      console.log("usuario:", rolUsuario);
      if (!rolesPermitidos.includes(rolUsuario)) {
        return res.status(403).json({ error: "Acceso denegado por rol" });
      }

      // Guardar usuario en req para usarlo en controladores
      req.usuario = {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.rol,
      };

      next();
    } catch (error) {
      return res.status(401).json({ error: error.message || "Token inválido" });
    }
  };
};
