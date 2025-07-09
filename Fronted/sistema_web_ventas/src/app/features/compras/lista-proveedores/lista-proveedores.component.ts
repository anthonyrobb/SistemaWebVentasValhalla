import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

export interface Proveedor {
  id: number;
  nombre: string;
  tipoDocumento: 'DNI' | 'Cédula' | 'RUC';
  numeroDocumento: string;
  telefono: string;
  email: string;
}

@Component({
  selector: 'app-lista-proveedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit, OnDestroy {
  private fb = new FormBuilder();

  proveedores: Proveedor[] = [
    { id: 1, nombre: 'proveedor1', tipoDocumento: 'DNI', numeroDocumento: '12345678', telefono: '987456321', email: 'proveedor@gmail.com' },
    { id: 2, nombre: 'proveedor5', tipoDocumento: 'DNI', numeroDocumento: '30225145', telefono: '987456321', email: 'pro@gmail.com' },
    { id: 3, nombre: 'DIGICORP', tipoDocumento: 'RUC', numeroDocumento: '9852016', telefono: '71609731', email: 'DIGICORP@HOTMAIL.COM' },
    { id: 4, nombre: 'SELLO DE ORO', tipoDocumento: 'DNI', numeroDocumento: '1101', telefono: '3045614452', email: 'lang@gmail.com' },
    { id: 5, nombre: 'Jota', tipoDocumento: 'Cédula', numeroDocumento: '106753462', telefono: '3045614452', email: 'lang@gmail.com' }
  ];
  filteredProveedores: Proveedor[] = [...this.proveedores];

  proveedorForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.minLength(8)]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,}$')]],
    email: ['', [Validators.required, Validators.email]]
  });

  showAddModal: boolean = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  filtrarProveedores(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProveedores = this.proveedores.filter(proveedor =>
      proveedor.nombre.toLowerCase().includes(input) ||
      proveedor.numeroDocumento.includes(input) ||
      proveedor.telefono.includes(input) ||
      proveedor.email.toLowerCase().includes(input)
    );
  }

  agregarProveedor(): void {
    if (this.proveedorForm.invalid) {
      this.proveedorForm.markAllAsTouched();
      return;
    }
    const nuevoProveedor: Proveedor = {
      id: Date.now(),
      ...this.proveedorForm.value
    };
    this.proveedores.push(nuevoProveedor);
    this.filteredProveedores = [...this.proveedores];
    this.closeAddModal();
  }

  eliminarProveedor(proveedor: Proveedor): void {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.proveedores = this.proveedores.filter(p => p.id !== proveedor.id);
      this.filteredProveedores = [...this.proveedores];
    }
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.proveedorForm.reset();
  }
}