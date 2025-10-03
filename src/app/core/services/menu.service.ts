import { Injectable } from '@angular/core';
import { MenuItem } from '../../interfaces/menuItem';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  getFilteredMenus(
    role: string,
    items: MenuItem[],
  ): { main: MenuItem[]; secondary: MenuItem[] } {
    let mainMenuItems: MenuItem[] = [];
    let secondaryMenuItems: MenuItem[] = [];

    if (role === 'admin') {
      mainMenuItems = items.filter((item) =>
        ['Dashboard', 'Requests', 'Map', 'Electricians'].includes(item.label),
      );
      secondaryMenuItems = items.filter((item) => item.label === 'Settings');
    } else if (role === 'client') {
      mainMenuItems = items.filter((item) => item.label === 'New Request');
    } else {
      mainMenuItems = [];
      secondaryMenuItems = [];
    }

    secondaryMenuItems.push({
      routerLink: '',
      label: 'Logout',
      icon: 'fa-solid fa-arrow-right-from-bracket',
    });

    return { main: mainMenuItems, secondary: secondaryMenuItems };
  }
}
