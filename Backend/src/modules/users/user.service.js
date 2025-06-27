import { v4 as uuidv4 } from 'uuid';
import { Usuario } from './user.model.js';
import { uuidToBuffer } from '../../utils/uuid.utils.js'; // Si tienes helper
import bcrypt from 'bcrypt';
import { RolDeUsuario } from '../rol/rol.model.js';
import { TipoDeDocumento } from '../typeDocument/typeDocument.model.js';

export const UsuarioService = {
  async crearUsuario(data) {
    const {
      nombre,
      apellidos,
      documento_identidad,
      telefono,
      email,
      password,
      id_rol_de_usuario,
      id_tipo_de_documento
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      id_usuario: uuidToBuffer(uuidv4()), // <- UUID convertido a Buffer
      nombre,
      apellidos,
      documento_identidad,
      telefono,
      email,
      password: hashedPassword,
      id_rol_de_usuario,
      id_tipo_de_documento
    });
    const usuarioSinPassword = { ...nuevoUsuario.get(), password: undefined };
    return usuarioSinPassword;
  },
  async obtenerUsuarios() {
    const usuarios = await Usuario.findAll({
      include: [
        { 
          model: RolDeUsuario, 
          as: 'rol',
          attributes: ['id_rol_de_usuario', 'descripcion'] 
        },
        { 
          model: TipoDeDocumento, 
          as: 'tipoDocumento',
          attributes: ['id_tipo_de_documento', 'descripcion'] 
        }
      ],
      attributes: { exclude: ['password'] }
    });
    
    return usuarios.map(usuario => usuario.get());
  },
  async obtenerUsuarioPorId(id) {
    const usuario = await Usuario.findByPk( uuidToBuffer(id), {
      include: [
        { 
          model: RolDeUsuario, 
          as: 'rol',
          attributes: ['id_rol_de_usuario', 'descripcion'] 
        },
        { 
          model: TipoDeDocumento, 
          as: 'tipoDocumento',
          attributes: ['id_tipo_de_documento', 'descripcion'] 
        }
      ],
      attributes: { exclude: ['password'] }
    });
    
    return usuario ? usuario.get({plain: true}) : null;
  },
  async actualizarUsuarioPorId(id, data) {
    const usuario = await Usuario.findByPk(uuidToBuffer(id));
    if (!usuario) return null;

    const {
      nombre,
      apellidos,
      documento_identidad,
      telefono,
      email,
      password,
      id_rol_de_usuario,
      id_tipo_de_documento
    } = data;

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    await usuario.update({
      nombre: nombre || usuario.nombre, // Mantener el nombre si no se actualiza
      apellidos: apellidos || usuario.apellidos, // Mantener los apellidos si no se actualiza
      documento_identidad: documento_identidad || usuario.documento_identidad, // Mantener el documento si no se actualiza
      telefono: telefono || usuario.telefono, // Mantener el teléfono si no se actualiza
      email: email || usuario.email, // Mantener el email si no se actualiza
      password: data.password || usuario.password, // Mantener la contraseña si no se actualiza
      id_rol_de_usuario: id_rol_de_usuario || usuario.id_rol_de_usuario,
      id_tipo_de_documento: id_tipo_de_documento || usuario.id_tipo_de_documento
    });

    const usuarioActualizado = { ...usuario.get(), password: undefined };
    return usuarioActualizado;
  },
  async eliminarUsuarioPorId(id) {
    const usuario = await Usuario.findByPk(uuidToBuffer(id));
    if (!usuario) return null;

    await usuario.destroy();
    return true; // Retorna true si la eliminación fue exitosa
  }
};