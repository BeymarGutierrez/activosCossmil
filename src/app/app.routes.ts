import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.routes').then((m) => m.MAIN_ROUTES),
  },
  { path: '**', redirectTo: 'main' },
];
