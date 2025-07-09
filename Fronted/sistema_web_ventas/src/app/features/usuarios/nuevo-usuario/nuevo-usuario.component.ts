import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

export interface Usuario {
  id: number;
  nombre: string;
  tipoDocumento: string;
  numeroDocumento: string;
  direccion?: string;
  telefono: string;
  email?: string;
  cargo?: string;
  login: string;
  clave: string;
  permisos: { [key: string]: boolean };
  estado: 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit, OnDestroy {
  private fb = new FormBuilder();

  usuarios: Usuario[] = [
    { id: 1, nombre: 'Juan Pérez', tipoDocumento: 'DNI', numeroDocumento: '12345678', direccion: 'Av. Siempre Viva 123', telefono: '987654321', email: 'juan@example.com', cargo: 'Administrador', login: 'juanp', clave: '123456', permisos: { ventas: true, compras: true, inventario: false, usuarios: true, caja: false }, estado: 'Activo' },
    { id: 2, nombre: 'María López', tipoDocumento: 'RUC', numeroDocumento: '20123456789', telefono: '987654322', login: 'marial', clave: 'password', permisos: { ventas: false, compras: true, inventario: true, usuarios: false, caja: false }, estado: 'Inactivo' }
  ];
  filteredUsuarios: Usuario[] = [...this.usuarios];

  permisos: string[] = ['ventas', 'compras', 'inventario', 'usuarios', 'caja'];

  usuarioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.minLength(8)]],
    direccion: [''],
    telefono: ['', Validators.minLength(9)],
    email: [''],
    cargo: [''],
    login: ['', [Validators.required, Validators.minLength(4)]],
    clave: ['', [Validators.required, Validators.minLength(6)]],
    ...(['ventas', 'compras', 'inventario', 'usuarios', 'caja'].reduce((acc, permiso) => ({ ...acc, [permiso]: [false] }), {}))
  });

  changePasswordForm: FormGroup = this.fb.group({
    nuevaClave: ['', [Validators.required, Validators.minLength(6)]]
  });
  showAddModal: boolean = false;
  showChangePasswordModal: boolean = false;
  selectedUsuario: Usuario | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  ngOnInit(): void {
    this.updatePagination();
  }

  ngOnDestroy(): void {}

  filtrarUsuarios(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(input) ||
      usuario.tipoDocumento.toLowerCase().includes(input) ||
      usuario.numeroDocumento.includes(input) ||
      (usuario.direccion?.toLowerCase() || '').includes(input) ||
      usuario.telefono.includes(input) ||
      (usuario.email?.toLowerCase() || '').includes(input) ||
      (usuario.cargo?.toLowerCase() || '').includes(input) ||
      usuario.login.toLowerCase().includes(input) ||
      usuario.estado.toLowerCase().includes(input)
    );
    this.updatePagination();
  }

  onPermisoChange(event: Event, permiso: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.usuarioForm.get(permiso)?.setValue(isChecked);
  }

  agregarUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }
    const nuevoUsuario: Usuario = {
      id: Date.now(),
      ...this.usuarioForm.value,
      telefono: this.usuarioForm.value.telefono || '',
      permisos: this.permisos.reduce((acc, permiso) => ({ ...acc, [permiso]: this.usuarioForm.get(permiso)?.value || false }), {}),
      estado: 'Activo'
    };
    this.usuarios.push(nuevoUsuario);
    this.filteredUsuarios = [...this.usuarios];
    this.closeAddModal();
  }

  openChangePasswordModal(usuario: Usuario): void {
    this.selectedUsuario = usuario;
    this.changePasswordForm.reset();
    this.showChangePasswordModal = true;
  }

  cambiarClave(): void {
    if (this.changePasswordForm.invalid || !this.selectedUsuario) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    this.selectedUsuario.clave = this.changePasswordForm.value.nuevaClave;
    this.closeChangePasswordModal();
  }

  toggleUsuarioEstado(usuario: Usuario): void {
    if (confirm(`¿Estás seguro de ${usuario.estado === 'Activo' ? 'eliminar' : 'activar'} este usuario?`)) {
      usuario.estado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';
      this.filteredUsuarios = [...this.usuarios];
      this.updatePagination(); // Aseguramos que la paginación se actualice
    }
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.usuarioForm.reset({
      nombre: '', tipoDocumento: '', numeroDocumento: '', direccion: '', telefono: '', email: '', cargo: '', login: '', clave: ''
    });
    this.permisos.forEach(permiso => this.usuarioForm.get(permiso)?.setValue(false));
  }

  closeChangePasswordModal(): void {
    this.showChangePasswordModal = false;
    this.selectedUsuario = null;
  }

  // Paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsuarios.length / this.itemsPerPage);
    this.goToPage(this.currentPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredUsuarios = [...this.usuarios.filter(u => this.filteredUsuarios.some(fu => fu.id === u.id))].slice(start, end); // Ajuste para mantener el filtro
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