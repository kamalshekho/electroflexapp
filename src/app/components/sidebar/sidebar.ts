import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, NgClass],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isLeftSidebarCollapsed = input.required<boolean>();
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
}
