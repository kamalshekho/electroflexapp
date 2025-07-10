import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Requests } from './components/requests/requests';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Settings } from './components/settings/settings';
import { Electricians } from './components/electricians/electricians';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'requests', component: Requests },
  { path: 'electricians', component: Electricians },
  { path: 'settings', component: Settings },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFound },
];
