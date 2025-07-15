import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestComponent } from './components/requests/request.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ElectriciansComponent } from './components/electricians/electricians.component';
import { RequestFormComponent } from './components/requests/request-form/request-form.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { label: 'Dashboard', icon: 'fal fa-home' },
  },
  {
    path: 'requests',
    component: RequestComponent,
    data: { label: 'Requests', icon: 'fal fa-clipboard' },
  },
  // {
  //   path: 'requests/create',
  //   component: RequestFormComponent,
  //   data: { label: 'New Request', icon: 'fal fa-solid fa-plus' },
  // },
  {
    path: 'electricians',
    component: ElectriciansComponent,
    data: { label: 'Electricians', icon: 'fal fa-clipboard-user' },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { label: 'Settings', icon: 'fal fa-cog' },
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
