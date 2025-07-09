import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { NuevaVentaComponent } from './features/ventas/nueva-venta/nueva-venta.component';
import { ListaVentasComponent } from './features/ventas/lista-ventas/lista-ventas.component';
import { ListaProductosComponent } from './features/inventario/lista-productos/lista-productos.component';
import { ListaCategoriasComponent } from './features/inventario/lista-categorias/lista-categorias.component';
import { ListaComprasComponent } from './features/compras/lista-compras/lista-compras.component';
import { ListaProveedoresComponent } from './features/compras/lista-proveedores/lista-proveedores.component';
import { CajaComponent } from './features/caja/caja/caja.component';
import { NuevoUsuarioComponent } from './features/usuarios/nuevo-usuario/nuevo-usuario.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'nueva-venta', component: NuevaVentaComponent },
      { path: 'ventas-list', component: ListaVentasComponent },
      { path: 'lista-productos', component: ListaProductosComponent },
      { path: 'lista-categorias', component: ListaCategoriasComponent },
      { path: 'lista-compras', component: ListaComprasComponent },
      { path: 'lista-proveedores', component: ListaProveedoresComponent },
      { path: 'caja', component: CajaComponent },
      { path: 'nuevo-usuario', component: NuevoUsuarioComponent },
      { path: 'consulta-compras', component: ListaComprasComponent }, // Reutilizamos ListaCompras en lugar de Dashboard
      { path: 'consulta-ventas', component: ListaVentasComponent }, // Reutilizamos ListaVentas en lugar de Dashboard
      { path: '', redirectTo: 'nueva-venta', pathMatch: 'full' } // Redirige la raíz a nueva-venta
    ]
  },
  { path: '**', redirectTo: '/login' }
];