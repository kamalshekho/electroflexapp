import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { MenuService } from '../../core/services/menu.service';
import { MenuItem } from '../../interfaces/menuItem';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() isLeftSidebarCollapsed: boolean = false;
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  mainMenuItems: MenuItem[] = [];
  secondaryMenuItems: MenuItem[] = [];

  get allMenuSections() {
    return [
      { items: this.mainMenuItems, section: 'top' },
      { items: this.secondaryMenuItems, section: 'bottom' },
    ];
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuService: MenuService,
  ) {
    const user = this.authService.getCurrentUser();
    const role = user?.role || '';

    const items = this.router.config
      .filter((route) => route.data?.['label'])
      .map((route) => ({
        routerLink: '/' + route.path,
        label: route.data!['label'],
        icon: route.data!['icon'],
      }));

    const filteredMenus = this.menuService.getFilteredMenus(role, items);
    this.mainMenuItems = filteredMenus.main;
    this.secondaryMenuItems = filteredMenus.secondary;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  public toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
  }

  public closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
