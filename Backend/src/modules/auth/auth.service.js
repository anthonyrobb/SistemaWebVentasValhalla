import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../users/user.model.js';
import 'dotenv/config';


const SECRET = process.env.JWT_SECRET || 'secreto';

export const AuthService = {
  async login({ email, password }) {

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) throw new Error('Email o contraseña incorrectos');

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) throw new Error('Email o contraseña incorrectos');
    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.id_rol_de_usuario==1 ? 'administrador' : 'vendedor', email: usuario.email },
      SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );

    return { token, usuario: 
        { 
            id: usuario.id_usuario, 
            rol: usuario.id_rol_de_usuario==1 ? 'administrador' : 'vendedor', 
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            documento_identidad: usuario.documento_identidad
        } };
  }
};
