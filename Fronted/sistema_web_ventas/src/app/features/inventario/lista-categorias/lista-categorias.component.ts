import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  estado: 'Activo';
}

@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit, OnDestroy {
  private fb = new FormBuilder();

  categorias: Categoria[] = [
    { id: 1, nombre: 'categoria11', descripcion: 'descripción de la categoría', estado: 'Activo' },
    { id: 2, nombre: 'pantalas editado', descripcion: 'descripción de la categoría', estado: 'Activo' },
    { id: 3, nombre: 'teclados', descripcion: 'teclados normales', estado: 'Activo' },
    { id: 4, nombre: 'fsff', descripcion: 'fsafs', estado: 'Activo' },
    { id: 5, nombre: 'CAMARAS 2MP', descripcion: 'CAMARAS', estado: 'Activo' }
  ];
  filteredCategorias: Categoria[] = [...this.categorias];

  categoriaForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(5)]]
  });

  showAddModal: boolean = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  filtrarCategorias(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCategorias = this.categorias.filter(categoria =>
      categoria.nombre.toLowerCase().includes(input) ||
      categoria.descripcion.toLowerCase().includes(input)
    );
  }

  agregarCategoria(): void {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }
    const nuevaCategoria: Categoria = {
      id: Date.now(),
      ...this.categoriaForm.value,
      estado: 'Activo'
    };
    this.categorias.push(nuevaCategoria);
    this.filteredCategorias = [...this.categorias];
    this.closeAddModal();
  }

  eliminarCategoria(categoria: Categoria): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categorias = this.categorias.filter(c => c.id !== categoria.id);
      this.filteredCategorias = [...this.categorias];
    }
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.categoriaForm.reset();
  }
}