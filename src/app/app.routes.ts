import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestsComponent } from './components/requests/requests.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ElectriciansComponent } from './components/electricians/electricians.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'electricians', component: ElectriciansComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
