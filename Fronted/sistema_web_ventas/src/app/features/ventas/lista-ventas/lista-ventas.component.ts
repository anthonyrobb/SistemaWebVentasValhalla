import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lista-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {
  private fb = new FormBuilder();
  private route = new ActivatedRoute();
  private router = new Router();

  filterForm = this.fb.group({
    fechaInicio: [''],
    fechaFin: [''],
    tipoVenta: ['']
  });

  tiposVenta = ['Local', 'Delivery'];

  ventas = [
    { id: 1, fecha: '2025-05-26', tipoVenta: 'Local', total: 150 },
    { id: 2, fecha: '2025-05-25', tipoVenta: 'Delivery', total: 200 }
  ];

  filteredVentas = [...this.ventas];

  ngOnInit(): void {
    // Leer queryParams para aplicar filtros
    this.route.queryParams.subscribe(params => {
      const fechaInicio = params['fechaInicio'] || '';
      const fechaFin = params['fechaFin'] || '';
      const tipoVenta = params['tipoVenta'] || '';

      this.filterForm.patchValue({
        fechaInicio,
        fechaFin,
        tipoVenta
      });

      this.applyFilters();
    });
  }

  applyFilters(): void {
    const { fechaInicio, fechaFin, tipoVenta } = this.filterForm.value;
    this.filteredVentas = this.ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha);
      const inicio = fechaInicio ? new Date(fechaInicio) : null;
      const fin = fechaFin ? new Date(fechaFin) : null;

      const matchFecha =
        (!inicio || fechaVenta >= inicio) &&
        (!fin || fechaVenta <= fin);
      const matchTipoVenta = !tipoVenta || venta.tipoVenta === tipoVenta;

      return matchFecha && matchTipoVenta;
    });

    if (this.filteredVentas.length === 0 && !fechaInicio && !fechaFin && !tipoVenta) {
      this.filteredVentas = [...this.ventas]; // Mostrar todas las ventas si no hay filtros
    }

    // Actualizar queryParams
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        fechaInicio,
        fechaFin,
        tipoVenta
      },
      queryParamsHandling: 'merge'
    });
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredVentas = [...this.ventas];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
}