import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestComponent } from './components/requests/request.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ElectriciansComponent } from './components/electricians/electricians.component';
import { RequestFormComponent } from './components/requests/request-form/request-form.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { label: 'Dashboard', icon: 'fa-solid fa-home' },
  },
  {
    path: 'requests',
    component: RequestComponent,
    data: { label: 'Requests', icon: 'fa-solid fa-clipboard' },
  },
  {
    path: 'map',
    component: MappingComponent,
    data: { label: 'Map', icon: 'fa-regular fa-map' },
  },
  {
    path: 'requests/create',
    component: RequestFormComponent,
    data: { label: 'New Request', icon: 'fa-solid fa-solid fa-plus' },
  },
  {
    path: 'electricians',
    component: ElectriciansComponent,
    data: { label: 'Electricians', icon: 'fa-solid fa-clipboard-user' },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { label: 'Settings', icon: 'fa-solid fa-cog' },
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
