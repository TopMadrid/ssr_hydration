import { Routes } from '@angular/router';
import { SaludoComponent } from './components/saludo/saludo.component';

export const routes: Routes = [
  { path: 'componente1', loadComponent: () => import('./components/componente1/componente1.component').then((c) => c.Componente1Component) },
  { path: 'componente2', loadComponent: () => import('./components/componente2/componente2.component').then((c) => c.Componente2Component) },
  { path: 'saludo', component: SaludoComponent },
  
  { path: '', redirectTo: '/componente1', pathMatch: 'full' }
];

