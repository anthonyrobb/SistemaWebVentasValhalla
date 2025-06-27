import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent implements OnInit, OnDestroy {
  private fb = new FormBuilder();

  articulosDisponibles = [
    { nombre: 'Whisky Johnnie Walker', precio: 150 },
    { nombre: 'Vodka Absolut', precio: 80 },
    { nombre: 'Tequila Don Julio', precio: 200 },
    { nombre: 'Cerveza Cusqueña', precio: 5.50 },
    { nombre: 'Pisco Quebranta', precio: 35.00 }
  ];

  filteredSuggestions: { nombre: string; precio: number }[] = [];
  selectedIndex: number = -1;

  @ViewChild('searchInputElement') searchInputRef!: ElementRef<HTMLInputElement>;

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
    this.ventaForm.valueChanges.subscribe(() => this.calcularCambio());
    this.articuloForm.get('cantidad')?.valueChanges.subscribe(() => this.onQuantityOrDiscountChange());
    this.articuloForm.get('descuento')?.valueChanges.subscribe(() => this.onQuantityOrDiscountChange());
    this.articuloForm.get('articulo')?.valueChanges.subscribe(() => this.updateSubtotal()); // Actualizar subtotal al cambiar artículo
  }

  ngOnDestroy(): void {}

  // Actualizar sugerencias al escribir
  onSearchInput(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    console.log('Término escrito:', term);
    this.filterSuggestions(term);
    this.selectedIndex = -1;
  }

  // Filtrar sugerencias
  private filterSuggestions(term: string): void {
    const trimmedTerm = term.trim();
    if (trimmedTerm.length === 0) {
      this.filteredSuggestions = [...this.articulosDisponibles];
    } else {
      this.filteredSuggestions = this.articulosDisponibles.filter(articulo =>
        articulo.nombre.toLowerCase().includes(trimmedTerm.toLowerCase())
      );
    }
    console.log('Sugerencias filtradas:', this.filteredSuggestions);
  }

  // Manejar teclas (flechas y Enter)
  onKeydown(event: KeyboardEvent): void {
    if (!this.filteredSuggestions.length) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.filteredSuggestions.length - 1, this.selectedIndex + 1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredSuggestions.length) {
          this.selectSuggestion(this.filteredSuggestions[this.selectedIndex].nombre);
        }
        break;
    }

    if (this.selectedIndex >= 0) {
      const selectedName = this.filteredSuggestions[this.selectedIndex].nombre;
      this.articuloForm.patchValue({ articulo: selectedName }, { emitEvent: true }); // Actualizar artículo en tiempo real
    }
    console.log('Índice seleccionado:', this.selectedIndex);
  }

  // Seleccionar una sugerencia
  selectSuggestion(nombre: string): void {
    const selectedArticulo = this.articulosDisponibles.find(a => a.nombre === nombre);
    if (selectedArticulo) {
      // Actualizar el formulario con los valores del artículo seleccionado
      this.articuloForm.patchValue({
        articulo: selectedArticulo.nombre,
        precio: selectedArticulo.precio
      }, { emitEvent: true });
      this.updateSubtotal(); // Recalcular subtotal
      this.filteredSuggestions = [];
      this.selectedIndex = -1;
      this.searchInputRef.nativeElement.value = selectedArticulo.nombre; // Forzar actualización visual
      this.searchInputRef.nativeElement.focus();
      console.log('Formulario actualizado:', this.articuloForm.value); // Depuración
    }
  }

  // Actualizar subtotal basado en cantidad y descuento
  private updateSubtotal(): void {
    const precio = this.articuloForm.get('precio')?.value || 0;
    const cantidad = this.articuloForm.get('cantidad')?.value || 1;
    const descuento = this.articuloForm.get('descuento')?.value || 0;
    const subtotal = (precio * cantidad) - descuento;
    this.articuloForm.patchValue({ subtotal }, { emitEvent: false });
  }

  onQuantityOrDiscountChange(): void {
    this.updateSubtotal();
  }

  agregarArticulo(): void {
    if (this.articuloForm.invalid) {
      this.articuloForm.markAllAsTouched();
      return;
    }

    const articulo: Articulo = {
      nombre: this.articuloForm.get('articulo')?.value || '',
      cantidad: this.articuloForm.get('cantidad')?.value || 1,
      precio: this.articuloForm.get('precio')?.value || 0,
      descuento: this.articuloForm.get('descuento')?.value || 0,
      subtotal: this.articuloForm.get('subtotal')?.value || 0
    };

    this.articulosAgregados.push(articulo);
    this.totalVenta = this.articulosAgregados.reduce((sum, a) => sum + a.subtotal, 0);
    this.calcularCambio();
    this.articuloForm.reset({ cantidad: 1, descuento: 0, articulo: '', precio: 0, subtotal: 0 });
    this.filteredSuggestions = [];
    this.searchInputRef.nativeElement.value = ''; // Limpiar input manualmente
  }

  calcularCambio(): void {
    const montoPagado = this.ventaForm.get('montoPagado')?.value || 0;
    this.cambio = montoPagado - this.totalVenta;
  }

  guardarVenta(): void {
    if (this.ventaForm.invalid || this.articulosAgregados.length === 0) {
      this.ventaForm.markAllAsTouched();
      return;
    }

    const venta = {
      fecha: this.ventaForm.get('fecha')?.value,
      tipoPago: this.ventaForm.get('tipoPago')?.value,
      tipoVenta: this.ventaForm.get('tipoVenta')?.value,
      montoPagado: this.ventaForm.get('montoPagado')?.value,
      articulos: [...this.articulosAgregados],
      totalVenta: this.totalVenta,
      cambio: this.cambio
    };

    console.log('Venta guardada (simulación):', venta);
    this.resetForm();
  }

  cancelarVenta(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.ventaForm.reset();
    this.articuloForm.reset({ cantidad: 1, descuento: 0, articulo: '', precio: 0, subtotal: 0 });
    this.articulosAgregados = [];
    this.totalVenta = 0;
    this.cambio = 0;
    this.filteredSuggestions = [];
    this.selectedIndex = -1;
    this.searchInputRef.nativeElement.value = ''; // Limpiar input manualmente
  }
}