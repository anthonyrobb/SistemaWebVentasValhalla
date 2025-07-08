import { v4 as uuidv4 } from "uuid";
import { Cliente } from "./client.model.js";
import { uuidToBuffer } from "../../utils/uuid.utils.js"; // Si tienes helper
import { TipoDeDocumento } from "../typeDocument/typeDocument.model.js";

export const ClienteService = {
  async crearCliente(data) {
    const {
      nombre,
      apellidos,
      telefono,
      email,
      id_tipo_de_documento,
      numero_doc_identidad,
    } = data;

    const nuevoCliente = await Cliente.create({
      id_cliente: uuidToBuffer(uuidv4()),
      nombre,
      apellidos,
      telefono,
      email,
      id_tipo_de_documento,
      numero_doc_identidad,
      fecha_alta: new Date(), // Asignar la fecha actual como fecha de alta
    });

    return nuevoCliente;
  },

  async obtenerClientes() {
    const clientes = await Cliente.findAll(
        {
            attributes: { exclude: ['id_tipo_de_documento'] },
            include: [
                {
                model: TipoDeDocumento,
                as: 'tipoDeDocumento',
                attributes: ['id_tipo_de_documento', 'descripcion']
                }
            ]
        }
    );
    return clientes;
  },
  async obtenerClientePorId(id) {
    const cliente = await Cliente.findByPk(uuidToBuffer(id), {
        attributes: { exclude: ['id_tipo_de_documento'] },
        include: [
            {
                model: TipoDeDocumento,
                as: 'tipoDeDocumento',
                attributes: ['id_tipo_de_documento', 'descripcion']
            }
        ]
    });
    return cliente;
  },

  async actualizarClientePorId(id, data) {
    const cliente = await Cliente.findByPk(uuidToBuffer(id), {
        include: [
            {
                model: TipoDeDocumento,
                as: 'tipoDeDocumento',
                attributes: ['id_tipo_de_documento', 'descripcion']
            }
        ]
    });
    if (!cliente) return null;

    await cliente.update(data);
    return cliente.get({ plain: true });
  },

  async eliminarClientePorId(id) {
    const cliente = await Cliente.findByPk(uuidToBuffer(id));
    if (!cliente) return null;

    await cliente.destroy();
    return true;
  },
};