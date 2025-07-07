import { v4 as uuidv4 } from "uuid";
import { Proveedor } from "./provider.model.js";
import { uuidToBuffer } from "../../utils/uuid.utils.js"; // Si tienes helper
import { Empresa } from "../company/company.model.js";
import { TipoDeDocumento } from "../typeDocument/typeDocument.model.js";

export const ProveedorService = {
  async crearProveedor(data) {
    const {
      nombre,
      apellidos,
      numero_doc_identidad,
      email,
      telefono,
      id_tipo_de_documento,
      id_empresa,
    } = data;

    const nuevoProveedor = await Proveedor.create({
      id_proveedor: uuidToBuffer(uuidv4()), // <- UUID convertido a Buffer
      nombre,
      apellidos,
      numero_doc_identidad,
      email,
      telefono,
      id_tipo_de_documento,
      id_empresa: uuidToBuffer(id_empresa), // Convertir a Buffer si es necesario
    });
    return nuevoProveedor;
  },

  async obtenerProveedores() {
    const proveedores = await Proveedor.findAll({
      include: [
        {
          model: Empresa,
          as: "empresa",
          attributes: ["id_empresa", "nombre", "RUC"],
        },
        {
          model: TipoDeDocumento,
          as: "tipoDeDocumento",
          attributes: ["id_tipo_de_documento", "descripcion"],
        },
      ],
      attributes: { exclude: ["id_tipo_de_documento", "id_empresa"] }
    });
    return proveedores;
  },

  async obtenerProveedorPorId(id) {
    const proveedor = await Proveedor.findByPk(uuidToBuffer(id), {
      include: [
        {
          model: TipoDeDocumento,
          as: "tipoDeDocumento", // ✅ alias exacto como lo definiste
        },
        {
          model: Empresa,
          as: "empresa", // suponiendo que esta es tu otra asociación
        },
      ],
      attributes: { exclude: ["id_tipo_de_documento", "id_empresa"] },
    });
    return proveedor ? proveedor.get({ plain: true }) : null;
  },

  async actualizarProveedorPorId(id, data) {
    const proveedor = await Proveedor.findByPk(uuidToBuffer(id));
    if (!proveedor) return null;

    const {
      nombre,
      apellidos,
      numero_doc_identidad,
      email,
      telefono,
      id_tipo_de_documento,
      id_empresa,
    } = data;

    await proveedor.update({
      nombre: nombre || proveedor.nombre, // Mantener el nombre si no se actualiza
      apellidos: apellidos || proveedor.apellidos,
      numero_doc_identidad:
        numero_doc_identidad || proveedor.numero_doc_identidad,
      email: email || proveedor.email,
      telefono: telefono || proveedor.telefono,
      id_tipo_de_documento: id_tipo_de_documento || proveedor.id_tipo_de_documento,
      id_empresa: id_empresa ? uuidToBuffer(id_empresa) : proveedor.id_empresa,
    });

    return proveedor.get({ plain: true });
  },

  async eliminarProveedorPorId(id) {
    const proveedor = await Proveedor.findByPk(uuidToBuffer(id));
    if (!proveedor) return null;

    await proveedor.destroy();
    return true; // Retorna true si la eliminación fue exitosa
  },
};
