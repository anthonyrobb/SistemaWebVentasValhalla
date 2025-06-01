import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Articulo {
  nombre: string;
  cantidad: number;
  precio: number;
  descuento: number;
  subtotal: number;
}

@Component({
  selector: 'app-nueva-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent implements OnInit {
  private fb = new FormBuilder();
  private route = new ActivatedRoute();
  private router = new Router();

  articulosDisponibles = [
    { nombre: 'Whisky Johnnie Walker', precio: 150 },
    { nombre: 'Vodka Absolut', precio: 80 },
    { nombre: 'Tequila Don Julio', precio: 200 }
  ];

  ventaForm = this.fb.group({
    fecha: ['', Validators.required],
    tipoPago: ['', Validators.required],
    tipoVenta: ['', Validators.required],
    montoPagado: [0, [Validators.required, Validators.min(0)]]
  });

  articuloForm = this.fb.group({
    articulo: ['', Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    precio: [{ value: 0, disabled: true }],
    descuento: [0, [Validators.required, Validators.min(0)]],
    subtotal: [{ value: 0, disabled: true }]
  });

  articulosAgregados: Articulo[] = [];
  totalVenta: number = 0;
  cambio: number = 0;

  tiposPago = ['Efectivo', 'Yape', 'Tarjeta'];
  tiposVenta = ['Local', 'Delivery'];

  ngOnInit(): void {
    // Leer queryParams para restaurar el estado del formulario
    this.route.queryParams.subscribe(params => {
      const tipoPago = params['tipoPago'] || '';
      const tipoVenta = params['tipoVenta'] || '';
      const fecha = params['fecha'] || '';
      const montoPagado = params['montoPagado'] ? Number(params['montoPagado']) : 0;

      this.ventaForm.patchValue({
        fecha,
        tipoPago,
        tipoVenta,
        montoPagado
      });
      this.calcularCambio();
    });
  }

  onArticuloChange(): void {
    const articuloSeleccionado = this.articulosDisponibles.find(
      a => a.nombre === this.articuloForm.get('articulo')?.value
    );
    if (articuloSeleccionado) {
      this.articuloForm.patchValue({
        precio: articuloSeleccionado.precio,
        subtotal: articuloSeleccionado.precio * (this.articuloForm.get('cantidad')?.value ?? 1)
      });
    }
  }

  onCantidadOrDescuentoChange(): void {
    const precio = this.articuloForm.get('precio')?.value ?? 0;
    const cantidad = this.articuloForm.get('cantidad')?.value ?? 1;
    const descuento = this.articuloForm.get('descuento')?.value ?? 0;
    const subtotal = (precio * cantidad) - descuento;
    this.articuloForm.patchValue({ subtotal });
  }

  agregarArticulo(): void {
    if (this.articuloForm.invalid) {
      this.articuloForm.markAllAsTouched();
      return;
    }

    const articulo: Articulo = {
      nombre: this.articuloForm.get('articulo')?.value ?? '',
      cantidad: this.articuloForm.get('cantidad')?.value ?? 1,
      precio: this.articuloForm.get('precio')?.value ?? 0,
      descuento: this.articuloForm.get('descuento')?.value ?? 0,
      subtotal: this.articuloForm.get('subtotal')?.value ?? 0
    };

    this.articulosAgregados.push(articulo);
    this.totalVenta = this.articulosAgregados.reduce((sum, a) => sum + a.subtotal, 0);
    this.calcularCambio();
    this.articuloForm.reset({ cantidad: 1, descuento: 0 });
  }

  calcularCambio(): void {
    const montoPagado = this.ventaForm.get('montoPagado')?.value ?? 0;
    this.cambio = montoPagado - this.totalVenta;
  }

  // Actualizar queryParams al cambiar el formulario
  updateQueryParams(): void {
    const formValue = this.ventaForm.value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        fecha: formValue.fecha,
        tipoPago: formValue.tipoPago,
        tipoVenta: formValue.tipoVenta,
        montoPagado: formValue.montoPagado
      },
      queryParamsHandling: 'merge'
    });
  }

  guardarVenta(): void {
    if (this.ventaForm.invalid || this.articulosAgregados.length === 0) {
      this.ventaForm.markAllAsTouched();
      return;
    }

    console.log('Venta guardada:', {
      ...this.ventaForm.value,
      articulos: this.articulosAgregados,
      total: this.totalVenta,
      cambio: this.cambio
    });

    this.resetForm();
  }

  cancelarVenta(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.ventaForm.reset();
    this.articuloForm.reset({ cantidad: 1, descuento: 0 });
    this.articulosAgregados = [];
    this.totalVenta = 0;
    this.cambio = 0;
    // Limpiar queryParams
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
}