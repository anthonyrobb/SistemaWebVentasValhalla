import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as jsPDF from 'jspdf'; // Para generar PDF (instalar con npm install jspdf)

export interface ArticuloCompra {
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export interface Compra {
  id: number;
  fecha: string;
  proveedor: string;
  tipoComprobante: 'Boleta' | 'Factura';
  total: number;
  articulos: ArticuloCompra[];
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit, OnDestroy {
  private fb = new FormBuilder();

  // Lista estática de productos para el buscador
  productos: Producto[] = [
    { id: 1, nombre: 'Cerveza Pilsen', precio: 5.0 },
    { id: 2, nombre: 'Vino Tinto Malbec', precio: 20.0 },
    { id: 3, nombre: 'Whisky Johnnie Walker', precio: 50.0 },
    { id: 4, nombre: 'Ron Zacapa', precio: 45.0 },
    { id: 5, nombre: 'Vodka Absolut', precio: 30.0 }
  ];
  filteredProductos: Producto[] = [...this.productos];
  productoListId = 'productoList';

  compras: Compra[] = [
    {
      id: 1,
      fecha: '2025-07-01',
      proveedor: 'Proveedor A',
      tipoComprobante: 'Factura',
      total: 300,
      articulos: [
        { nombre: 'Cerveza Pilsen', cantidad: 2, precio: 100, subtotal: 200 },
        { nombre: 'Vino Tinto Malbec', cantidad: 1, precio: 100, subtotal: 100 }
      ]
    },
    {
      id: 2,
      fecha: '2025-07-02',
      proveedor: 'Proveedor B',
      tipoComprobante: 'Boleta',
      total: 150,
      articulos: [{ nombre: 'Whisky Johnnie Walker', cantidad: 1, precio: 150, subtotal: 150 }]
    }
  ];
  filteredCompras: Compra[] = [...this.compras];

  // Formularios
  filterForm: FormGroup = this.fb.group({
    fecha: [''],
    proveedor: [''],
    tipoComprobante: ['']
  });

  compraForm: FormGroup = this.fb.group({
    fecha: ['', Validators.required],
    proveedor: ['', Validators.required],
    tipoComprobante: ['Boleta', Validators.required],
    total: [{ value: 0, disabled: true }]
  });

  articuloForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    subtotal: [{ value: 0, disabled: true }]
  });

  articulosAgregados: ArticuloCompra[] = [];

  // Estados del modal
  showAddModal: boolean = false;
  showDetailModal: boolean = false;
  selectedCompra: Compra | null = null;

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(() => this.filtrarCompras());
    this.articuloForm.get('cantidad')?.valueChanges.subscribe(() => this.calcularSubtotal());
    this.articuloForm.get('precio')?.valueChanges.subscribe(() => this.calcularSubtotal());
    this.articuloForm.get('nombre')?.valueChanges.subscribe((nombre) => {
      const producto = this.productos.find(p => p.nombre === nombre);
      if (producto) {
        this.articuloForm.patchValue({ precio: producto.precio }, { emitEvent: true });
      }
    });
  }

  ngOnDestroy(): void {}

  filtrarCompras(): void {
    const { fecha, proveedor, tipoComprobante } = this.filterForm.value;
    this.filteredCompras = this.compras.filter(compra => {
      const fechaMatch = !fecha || compra.fecha === fecha;
      const proveedorMatch = !proveedor || compra.proveedor.toLowerCase().includes(proveedor.toLowerCase());
      const tipoComprobanteMatch = !tipoComprobante || compra.tipoComprobante === tipoComprobante;
      return fechaMatch && proveedorMatch && tipoComprobanteMatch;
    });
  }

  filtrarProductos(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProductos = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(input)
    );
  }

  agregarArticulo(): void {
    if (this.articuloForm.invalid) {
      this.articuloForm.markAllAsTouched();
      return;
    }
    const articulo: ArticuloCompra = {
      nombre: this.articuloForm.get('nombre')?.value || '',
      cantidad: this.articuloForm.get('cantidad')?.value || 1,
      precio: this.articuloForm.get('precio')?.value || 0,
      subtotal: this.articuloForm.get('subtotal')?.value || 0
    };
    this.articulosAgregados.push(articulo);
    this.calcularTotal();
    this.articuloForm.reset({ nombre: '', cantidad: 1, precio: 0, subtotal: 0 });
  }

  calcularSubtotal(): void {
    const cantidad = this.articuloForm.get('cantidad')?.value || 1;
    const precio = this.articuloForm.get('precio')?.value || 0;
    const subtotal = cantidad * precio;
    this.articuloForm.patchValue({ subtotal }, { emitEvent: false });
  }

  calcularTotal(): void {
    const total = this.articulosAgregados.reduce((sum, a) => sum + a.subtotal, 0);
    this.compraForm.patchValue({ total }, { emitEvent: false });
  }

  agregarCompra(): void {
    if (this.compraForm.invalid || this.articulosAgregados.length === 0) {
      this.compraForm.markAllAsTouched();
      return;
    }
    const nuevaCompra: Compra = {
      id: Date.now(),
      fecha: this.compraForm.get('fecha')?.value || '',
      proveedor: this.compraForm.get('proveedor')?.value || '',
      tipoComprobante: this.compraForm.get('tipoComprobante')?.value || 'Boleta',
      total: this.compraForm.get('total')?.value || 0,
      articulos: [...this.articulosAgregados]
    };
    this.compras.push(nuevaCompra);
    this.filtrarCompras();
    this.closeAddModal();
  }

  verDetallesCompra(compra: Compra | null): void {
    if (compra) {
      this.selectedCompra = compra;
      this.showDetailModal = true;
    }
  }

  eliminarCompra(compra: Compra | null): void {
    if (compra) {
      if (confirm('¿Estás seguro de eliminar esta compra?')) {
        this.compras = this.compras.filter(c => c.id !== compra.id);
        this.filtrarCompras();
      }
    }
  }

  // descargarPDF(): void {
  //   const doc = new jsPDF();
  //   doc.text('Lista de Compras', 10, 10);
  //   this.filteredCompras.forEach((compra, index) => {
  //     doc.text(`Compra #${compra.id}`, 10, 20 + index * 10);
  //     doc.text(`Fecha: ${compra.fecha}`, 20, 25 + index * 10);
  //     doc.text(`Proveedor: ${compra.proveedor}`, 20, 30 + index * 10);
  //     doc.text(`Tipo de Comprobante: ${compra.tipoComprobante}`, 20, 35 + index * 10);
  //     doc.text(`Total: $${compra.total}`, 20, 40 + index * 10);
  //   });
  //   doc.save('compras.pdf');
  // }

  closeAddModal(): void {
    this.showAddModal = false;
    this.compraForm.reset({ fecha: '', proveedor: '', tipoComprobante: 'Boleta', total: 0 });
    this.articulosAgregados = [];
    this.articuloForm.reset({ nombre: '', cantidad: 1, precio: 0, subtotal: 0 });
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedCompra = null;
  }
}