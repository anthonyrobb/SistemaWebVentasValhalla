import { AuthService } from './auth.service.js';

export const AuthController = {
  async login(req, res) {
    try {
      const resultado = await AuthService.login(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message || 'Error al iniciar sesión' });
    }
  }
};
