import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    // Suscribirse a los cambios de navegación para actualizar activeSection
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateActiveSection(event.urlAfterRedirects);
      });
  }

  // Estado de los submenús
  submenus = {
    ventas: false,
    compras: false,
    inventario: false,
    usuarios: false,
    reportes: false
  };

  // Sección activa
  activeSection: string | null = null;

  // Estado del sidebar (colapsado o no)
  isSidebarCollapsed = false;

  // Lista de subopciones para identificarlas
  private ventasSuboptions = ['nueva-venta', 'ventas-list'];
  private comprasSuboptions = ['lista-compras', 'lista-proveedores'];
  private inventarioSuboptions = ['lista-productos', 'lista-categorias'];
  private usuariosSuboptions = ['nuevo-usuario'];
  private reportesSuboptions = ['consulta-compras', 'consulta-ventas'];

  ngOnInit(): void {
    // Inicializar activeSection con la ruta actual al cargar el componente
    this.updateActiveSection(this.router.url);
  }

  private updateActiveSection(url: string): void {
    const path = url.split('/').pop(); // Obtener la última parte de la URL
    if (path && path !== '') {
      this.activeSection = path;
    } else {
      this.activeSection = 'dashboard'; // Por defecto al inicio
    }
    // Asegurar que el submenú correspondiente esté abierto si es una subopción
    this.syncSubmenuState();
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  private syncSubmenuState(): void {
    if (this.activeSection) {
      if (this.ventasSuboptions.includes(this.activeSection)) this.submenus.ventas = true;
      else if (this.comprasSuboptions.includes(this.activeSection)) this.submenus.compras = true;
      else if (this.inventarioSuboptions.includes(this.activeSection)) this.submenus.inventario = true;
      else if (this.usuariosSuboptions.includes(this.activeSection)) this.submenus.usuarios = true;
      else if (this.reportesSuboptions.includes(this.activeSection)) this.submenus.reportes = true;
      else {
        // Cerrar todos los submenús si es una opción principal
        for (const key in this.submenus) {
          this.submenus[key as keyof typeof this.submenus] = false;
        }
      }
    }
  }

  toggleSubmenu(menu: string): void {
    if (this.submenus[menu as keyof typeof this.submenus] !== undefined) {
      this.submenus[menu as keyof typeof this.submenus] = !this.submenus[menu as keyof typeof this.submenus];
      // Cerrar otros submenús al abrir uno nuevo
      for (const key in this.submenus) {
        if (key !== menu) {
          this.submenus[key as keyof typeof this.submenus] = false;
        }
      }
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  navigateTo(section: string): void {
    // Actualizar activeSection inmediatamente antes de navegar
    this.activeSection = section;
    this.cdr.detectChanges(); // Forzar la detección de cambios inmediatamente

    // Determinar si la sección pertenece a un submenú
    const isSuboption = [
      ...this.ventasSuboptions,
      ...this.comprasSuboptions,
      ...this.inventarioSuboptions,
      ...this.usuariosSuboptions,
      ...this.reportesSuboptions
    ].includes(section);

    // Mantener el submenú abierto si es una subopción
    if (isSuboption) {
      if (this.ventasSuboptions.includes(section)) this.submenus.ventas = true;
      else if (this.comprasSuboptions.includes(section)) this.submenus.compras = true;
      else if (this.inventarioSuboptions.includes(section)) this.submenus.inventario = true;
      else if (this.usuariosSuboptions.includes(section)) this.submenus.usuarios = true;
      else if (this.reportesSuboptions.includes(section)) this.submenus.reportes = true;
    } else {
      // Cerrar todos los submenús si es una opción principal (excepto caja)
      for (const key in this.submenus) {
        if (key !== 'caja') {
          this.submenus[key as keyof typeof this.submenus] = false;
        }
      }
    }

    // Navegar a la sección
    this.router.navigate([section]).then(() => {
      // Asegurar que el estado se sincronice después de la navegación
      this.syncSubmenuState();
      this.cdr.detectChanges(); // Forzar actualización post-navegación
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}