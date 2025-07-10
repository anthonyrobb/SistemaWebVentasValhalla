import { SalesService } from './sales.service.js';

export const SalesController = {
    async crearVenta(req, res) {
        try {
            const venta = await SalesService.crearVenta(req.body);
            res.status(201).json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async obtenerVentas(req, res) {
        try {
            const ventas = await SalesService.obtenerVentas();
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async obtenerVentaPorId(req, res) {
        try {
            const { id } = req.params;
            const venta = await SalesService.obtenerVentaPorId(id);
            if (!venta) {
                return res.status(404).json({ error: "Venta no encontrada" });
            }
            res.status(200).json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async actualizarVenta(req, res) {
        try {
            const { id } = req.params;
            const ventaActualizada = await SalesService.actualizarVenta(id, req.body);
            if (!ventaActualizada) {
                return res.status(404).json({ error: "Venta no encontrada" });
            }
            res.status(200).json(ventaActualizada);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async eliminarVenta(req, res) {
        try {
            const { id } = req.params;
            await SalesService.eliminarVenta(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};