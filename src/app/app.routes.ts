import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'herramientas', pathMatch: 'full' },
  {
    path: 'herramientas',
    loadComponent: () => import('./screens/herramientas/herramientas.component').then(m => m.HerramientasComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./screens/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'canvas',
    loadComponent: () => import('./screens/canvas/canvas.component').then(m => m.CanvasComponent),
  },
  {
    path: 'crear-asignatura',
    loadComponent: () => import('./screens/crear-asignatura/crear-asignatura.component').then(m => m.CrearAsignaturaComponent),
  },
  { path: '**', redirectTo: 'herramientas' },
];
