export interface Articulo {
  nombre: string;
  cantidad: number;
  precio: number;
  descuento: number;
  subtotal: number;
}

export interface Venta {
  id: number;
  fecha: string;
  tipoPago: string;
  tipoVenta: string;
  montoPagado: number;
  articulos: Articulo[];
  totalVenta: number;
  cambio: number;
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private ventas: Venta[] = [
    {
      id: 1,
      fecha: '2025-06-30',
      tipoPago: 'Efectivo',
      tipoVenta: 'Local',
      montoPagado: 200,
      articulos: [{ nombre: 'Whisky Johnnie Walker', cantidad: 1, precio: 150, descuento: 0, subtotal: 150 }],
      totalVenta: 150,
      cambio: 50
    },
    {
      id: 2,
      fecha: '2025-06-29',
      tipoPago: 'Yape',
      tipoVenta: 'Delivery',
      montoPagado: 85,
      articulos: [{ nombre: 'Vodka Absolut', cantidad: 1, precio: 80, descuento: 0, subtotal: 80 }],
      totalVenta: 80,
      cambio: 5
    }
  ];

  getVentas(): Venta[] {
    return [...this.ventas];
  }

  agregarVenta(venta: Venta): void {
    this.ventas.push(venta);
  }

  eliminarVenta(id: number): void {
    this.ventas = this.ventas.filter(v => v.id !== id);
  }
}