import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VentasService, Articulo, Venta } from '../../../services/ventas.service';

@Component({
  selector: 'app-lista-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit, OnDestroy {
  private fb = new FormBuilder();
  private ventasService: VentasService = inject(VentasService);

  filterForm: FormGroup = this.fb.group({
    fechaInicio: [''],
    fechaFin: [''],
    tipoVenta: ['']
  });

  ventas: Venta[] = this.ventasService.getVentas();
  filteredVentas: Venta[] = [...this.ventas];
  tiposVenta = ['Local', 'Delivery'];

  // Propiedades para el modal
  selectedVenta: Venta | null = null;
  showModal: boolean = false;

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(() => this.filtrarVentas());
  }

  ngOnDestroy(): void {}

  filtrarVentas(): void {
    const { fechaInicio, fechaFin, tipoVenta } = this.filterForm.value;
    this.filteredVentas = this.ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha);
      const fechaInicioFilter = fechaInicio ? new Date(fechaInicio) : null;
      const fechaFinFilter = fechaFin ? new Date(fechaFin) : null;
      const tipoVentaFilter = tipoVenta || '';

      const fechaMatch = (!fechaInicioFilter || fechaVenta >= fechaInicioFilter) &&
                         (!fechaFinFilter || fechaVenta <= fechaFinFilter);
      const tipoMatch = !tipoVentaFilter || venta.tipoVenta === tipoVentaFilter;

      return fechaMatch && tipoMatch;
    });
  }

  verDetallesVenta(venta: Venta | null): void {
    if (venta) {
      this.selectedVenta = venta;
      this.showModal = true;
      console.log('Ver detalles de la venta:', venta);
    } else {
      console.log('No hay venta seleccionada para ver detalles.');
    }
  }

  editarVenta(venta: Venta | null): void {
    if (venta) console.log('Editar venta:', venta);
    else console.log('No hay venta seleccionada para editar.');
  }

  eliminarVenta(venta: Venta | null): void {
    if (venta) {
      console.log('Eliminar venta:', venta);
      this.ventasService.eliminarVenta(venta.id);
      this.ventas = this.ventasService.getVentas();
      this.filtrarVentas();
    } else {
      console.log('No hay venta seleccionada para eliminar.');
    }
  }

  imprimirComprobante(venta: Venta | null): void {
    if (venta) console.log('Imprimir comprobante de la venta:', venta);
    else console.log('No hay venta seleccionada para imprimir.');
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedVenta = null;
  }
}