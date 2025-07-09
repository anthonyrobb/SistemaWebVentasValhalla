import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common'; // Corregimos la importación de CurrencyPipe
import { Compra, ArticuloCompra } from '../../compras/lista-compras/lista-compras.component'; // Ajusta la ruta según tu estructura

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  codigo: string;
  stock: number;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  estado: 'Activo';
}

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit, OnDestroy {
  private fb = new FormBuilder();

  // Datos estáticos de categorías
  categorias: Categoria[] = [
    { id: 1, nombre: 'pantalas editado', descripcion: 'descripción de la categoría', estado: 'Activo' },
    { id: 2, nombre: 'teclados', descripcion: 'teclados normales', estado: 'Activo' },
    { id: 3, nombre: 'Teléfonos', descripcion: 'dispositivos móviles', estado: 'Activo' }
  ];
  filteredCategorias: Categoria[] = [...this.categorias];
  categoriaListId = 'categoriaList';

  // Datos estáticos de compras
  compras: Compra[] = [
    {
      id: 1,
      fecha: '2025-07-01',
      proveedor: 'Proveedor A',
      tipoComprobante: 'Factura',
      total: 300,
      articulos: [
        { nombre: 'MONITOR HD-LG', cantidad: 2, precio: 100, subtotal: 200 },
        { nombre: 'sudadero Nike mountain', cantidad: 1, precio: 100, subtotal: 100 }
      ]
    },
    {
      id: 2,
      fecha: '2025-07-02',
      proveedor: 'Proveedor B',
      tipoComprobante: 'Boleta',
      total: 150,
      articulos: [{ nombre: 'Prueba', cantidad: 1, precio: 150, subtotal: 150 }]
    }
  ];

  productos: Producto[] = [
    { id: 1, nombre: 'MONITOR HD-LG', categoria: 'pantalas editado', codigo: 'TRIWH23', stock: 2, descripcion: 'MONITOR DE 14 PULGADAS', precioCompra: 100, precioVenta: 200 },
    { id: 2, nombre: 'vara maxima', categoria: 'Pantalones', codigo: '00001', stock: 0, descripcion: 'depepe', precioCompra: 0, precioVenta: 0 },
    { id: 3, nombre: 'Prueba', categoria: 'Refresco', codigo: '123', stock: 1, descripcion: 'Prueba guayaba', precioCompra: 0, precioVenta: 0 },
    { id: 4, nombre: 'sudadero Nike mountain', categoria: 'Sweater', codigo: '1011', stock: 1, descripcion: '', precioCompra: 100, precioVenta: 234.00 },
    { id: 5, nombre: 'parlantre', categoria: 'teclados', codigo: '6575uty', stock: -10, descripcion: 'alto parlante', precioCompra: 1.00, precioVenta: 1.00 },
    { id: 6, nombre: '295/60r15', categoria: 'teclados', codigo: '155152', stock: 0, descripcion: 'liso', precioCompra: 0, precioVenta: 0 },
    { id: 7, nombre: '295/80r16', categoria: 'teclados', codigo: '12341545', stock: 0, descripcion: '', precioCompra: 0, precioVenta: 0 },
    { id: 8, nombre: 'teclado', categoria: 'teclados', codigo: '55645rt', stock: -8, descripcion: 'teclado gamer', precioCompra: 0, precioVenta: 0 },
    { id: 9, nombre: 'iPhone 15 Pro Max', categoria: 'Teléfonos', codigo: 'iph-15', stock: 0, descripcion: '', precioCompra: 0, precioVenta: 0 }
  ];
  filteredProductos: Producto[] = [...this.productos];

  productoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    codigo: ['', [Validators.required, Validators.minLength(5)]],
    categoria: ['', Validators.required],
    descripcion: ['', Validators.required],
    precioVenta: [0, [Validators.required, Validators.min(0)]]
  });

  showAddModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  ngOnInit(): void {
    this.calcularStockYPrecioCompra();
    this.updatePagination();
  }

  ngOnDestroy(): void {}

  filtrarProductos(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    if (!input) {
      this.filteredProductos = [...this.productos]; // Si no hay texto, mostrar todos
    } else {
      this.filteredProductos = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(input) ||
        producto.categoria.toLowerCase().includes(input) ||
        producto.codigo.toLowerCase().includes(input) ||
        producto.descripcion.toLowerCase().includes(input) ||
        producto.stock.toString().includes(input) ||
        producto.precioCompra.toString().includes(input) ||
        producto.precioVenta.toString().includes(input)
      );
    }
    this.updatePagination();
  }

  filtrarCategorias(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCategorias = this.categorias.filter(categoria =>
      categoria.nombre.toLowerCase().includes(input)
    );
  }

  calcularStockYPrecioCompra(): void {
    this.productos.forEach(producto => {
      const comprasDelProducto = this.compras
        .flatMap(compra => compra.articulos)
        .filter(articulo => articulo.nombre === producto.nombre);
      producto.stock = comprasDelProducto.reduce((sum, articulo) => sum + articulo.cantidad, 0);
      const ultimoPrecio = comprasDelProducto.length > 0 ? comprasDelProducto[0].precio : 0;
      producto.precioCompra = ultimoPrecio;
    });
  }

  agregarProducto(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }
    const nuevoProducto: Producto = {
      id: Date.now(),
      ...this.productoForm.value,
      stock: 0,
      precioCompra: 0
    };
    this.productos.push(nuevoProducto);
    this.filteredProductos = [...this.productos]; // Aseguramos que se actualice con todos los productos
    this.calcularStockYPrecioCompra();
    this.closeAddModal();
  }

  eliminarProducto(producto: Producto): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.id !== producto.id);
      this.filteredProductos = [...this.productos];
      this.updatePagination();
    }
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.productoForm.reset({ nombre: '', codigo: '', categoria: '', descripcion: '', precioVenta: 0 });
  }

  // Paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProductos.length / this.itemsPerPage);
    this.goToPage(this.currentPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredProductos = [...this.filteredProductos].slice(start, end); // Usamos filteredProductos ya filtrado
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }
}