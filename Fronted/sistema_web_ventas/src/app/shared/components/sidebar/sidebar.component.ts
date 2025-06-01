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
  private router = new Router();
  private authService = new AuthService();

  // Estado de los submenús
  submenus = {
    ventas: false,
    reportes: false,
    usuarios:false,
  };

  // Sección activa
  activeSection: string | null = null;

  toggleSubmenu(menu: string): void {
    if (menu === 'ventas') {
      this.submenus.ventas = !this.submenus.ventas;
      this.submenus.reportes = false;
      this.activeSection = this.submenus.ventas ? 'ventas' : null;
    } else if (menu === 'reportes') {
      this.submenus.reportes = !this.submenus.reportes;
      this.submenus.ventas = false;
      this.activeSection = this.submenus.reportes ? 'reportes' : null;
    }
  }

  navigateTo(section: string): void {
    this.activeSection = section;
    console.log(`Navigating to ${section}`); // Simulamos navegación
    // Más adelante, implementaremos las rutas reales
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}