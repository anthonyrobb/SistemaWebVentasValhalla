import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  // Estado de los submenús
  submenus = {
    ventas: false,
    reportes: false,
    usuarios: false,
    inventario: false, // Añadimos el submenú para Inventario
    compras: false // Añadimos el submenú para Compras
  };

  // Sección activa
  activeSection: string | null = null;

  // Lista de subopciones para identificarlas
  private ventasSuboptions = ['nueva-venta', 'ventas-list'];
  private reportesSuboptions = ['consulta-compras', 'consulta-ventas'];
  private usuariosSuboptions = ['nuevo-usuario'];
  private inventarioSuboptions = ['lista-productos', 'lista-categorias'];
  private comprasSuboptions = ['lista-compras', 'lista-proveedores'];

  toggleSubmenu(menu: string): void {
    if (menu === 'ventas') {
      this.submenus.ventas = !this.submenus.ventas;
      this.submenus.reportes = false;
      this.submenus.usuarios = false;
      this.submenus.inventario = false;
      this.submenus.compras = false;
    } else if (menu === 'reportes') {
      this.submenus.reportes = !this.submenus.reportes;
      this.submenus.ventas = false;
      this.submenus.usuarios = false;
      this.submenus.inventario = false;
      this.submenus.compras = false;
    } else if (menu === 'usuarios') {
      this.submenus.usuarios = !this.submenus.usuarios;
      this.submenus.ventas = false;
      this.submenus.reportes = false;
      this.submenus.inventario = false;
      this.submenus.compras = false;
    } else if (menu === 'inventario') {
      this.submenus.inventario = !this.submenus.inventario;
      this.submenus.ventas = false;
      this.submenus.reportes = false;
      this.submenus.usuarios = false;
      this.submenus.compras = false;
    } else if (menu === 'compras') {
      this.submenus.compras = !this.submenus.compras;
      this.submenus.ventas = false;
      this.submenus.reportes = false;
      this.submenus.usuarios = false;
      this.submenus.inventario = false;
    }
  }

  navigateTo(section: string): void {
    // Determinar si la sección pertenece a un submenú
    const isVentasSuboption = this.ventasSuboptions.includes(section);
    const isReportesSuboption = this.reportesSuboptions.includes(section);
    const isUsuariosSuboption = this.usuariosSuboptions.includes(section);
    const isInventarioSuboption = this.inventarioSuboptions.includes(section);
    const isComprasSuboption = this.comprasSuboptions.includes(section);

    // Cerrar submenús si la sección no pertenece a ellos
    if (!isVentasSuboption) {
      this.submenus.ventas = false;
    }
    if (!isReportesSuboption) {
      this.submenus.reportes = false;
    }
    if (!isUsuariosSuboption) {
      this.submenus.usuarios = false;
    }
    if (!isInventarioSuboption) {
      this.submenus.inventario = false;
    }
    if (!isComprasSuboption) {
      this.submenus.compras = false;
    }

    // Actualizar activeSection y navegar
    this.activeSection = section;
    this.router.navigate([section]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}