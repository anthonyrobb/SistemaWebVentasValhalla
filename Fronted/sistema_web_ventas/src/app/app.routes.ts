import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { NuevaVentaComponent } from './features/ventas/nueva-venta/nueva-venta.component';
import { ListaVentasComponent } from './features/ventas/lista-ventas/lista-ventas.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent }, // Placeholder temporal
      { path: 'nueva-venta', component: NuevaVentaComponent },
      { path: 'ventas-list', component: ListaVentasComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];