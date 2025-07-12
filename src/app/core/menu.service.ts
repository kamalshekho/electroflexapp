import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  items = [
    {
      routerLink: 'dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard',
    },
    {
      routerLink: 'requests',
      icon: 'fal fa-clipboard',
      label: 'Requests',
    },
    {
      routerLink: 'electricians',
      icon: 'fal fa-clipboard-user',
      label: 'Electricians',
    },
    {
      routerLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings',
    },
  ];

  constructor() {}
}
