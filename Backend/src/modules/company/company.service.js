import { v4 as uuidv4 } from "uuid";
import { Empresa } from "./company.model.js";
import { uuidToBuffer } from "../../utils/uuid.utils.js"; // Si tienes helper

export const EmpresaService = {
  async crearEmpresa(data) {
    const { nombre, RUC } = data;

    const nuevaEmpresa = await Empresa.create({
      id_empresa: uuidToBuffer(uuidv4()), // <- UUID convertido a Buffer
      nombre,
      RUC,
    });
    return nuevaEmpresa;
  },

  async obtenerEmpresas() {
    const empresas = await Empresa.findAll();
    return empresas;
  },

  async obtenerEmpresaPorId(id) {
    const empresa = await Empresa.findByPk(uuidToBuffer(id));
    return empresa ? empresa.get({ plain: true }) : null;
  },

  async actualizarEmpresaPorId(id, data) {
    const empresa = await Empresa.findByPk(uuidToBuffer(id));
    if (!empresa) return null;

    const {
      nombre,
      RUC
    } = data;

    await empresa.update({
      nombre: nombre || empresa.nombre, // Mantener el nombre si no se actualiza
      RUC: RUC || empresa.RUC, // Mantener el RUC si no se actualiza
    });

    return empresa.get({ plain: true });
  },

  async eliminarEmpresaPorId(id) {
    const empresa = await Empresa.findByPk(uuidToBuffer(id));
    if (!empresa) return null;

    await empresa.destroy();
    return true; // Retorna true si la eliminación fue exitosa
  },
};

