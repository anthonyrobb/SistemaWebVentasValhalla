import { EmpresaService } from "./company.service.js";

export const EmpresaController = {
  async crearEmpresa(req, res) {
    try {
      const nuevaEmpresa = await EmpresaService.crearEmpresa(req.body);
      return res.status(201).json(nuevaEmpresa);
    } catch (error) {
      console.error("Error al crear empresa:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async obtenerEmpresas(req, res) {
    try {
      const empresas = await EmpresaService.obtenerEmpresas();
      return res.status(200).json(empresas);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async obtenerEmpresaPorId(req, res) {
    try {
      const { id } = req.params;
      const empresa = await EmpresaService.obtenerEmpresaPorId(id);
      if (!empresa) {
        return res.status(404).json({ error: "Empresa no encontrada" });
      }

      return res.status(200).json(empresa);
    } catch (error) {
      console.error("Error al obtener empresa por ID:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },

  async actualizarEmpresaPorId(req, res) {
    try {
      const { id } = req.params;
      const empresaActualizada = await EmpresaService.actualizarEmpresaPorId(
        id,
        req.body
      );
      if (!empresaActualizada) {
        return res.status(404).json({ error: "Empresa no encontrada" });
      }
      return res.status(200).json(empresaActualizada);
    } catch (error) {
      console.error("Error al actualizar empresa:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  },
  async eliminarEmpresaPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await EmpresaService.eliminarEmpresaPorId(id);
      if (!resultado) {
        return res.status(404).json({ error: "Empresa no encontrada" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
      return res.status(500).json({ error: "Error del servidor" });
    }
  }
};
