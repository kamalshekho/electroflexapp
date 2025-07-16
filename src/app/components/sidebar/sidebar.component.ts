import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
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
  ) {
    const user = this.authService.getCurrentUser();
    const role = user?.role;

    const items = this.router.config
      .filter((route) => route.data?.['label'])
      .map((route) => ({
        routerLink: '/' + route.path,
        label: route.data!['label'],
        icon: route.data!['icon'],
      }));

    if (role === 'admin') {
      this.mainMenuItems = items.filter((item) =>
        ['Dashboard', 'Requests', 'Map', 'Electricians'].includes(item.label),
      );
      this.secondaryMenuItems = items.filter(
        (item) => item.label === 'Settings',
      );
    } else if (role === 'client') {
      this.mainMenuItems = items.filter((item) => item.label === 'New Request');
    } else {
      this.mainMenuItems = [];
      this.secondaryMenuItems = [];
    }

    this.secondaryMenuItems.push({
      routerLink: '',
      label: 'Logout',
      icon: 'fa fa-sign-out-alt',
    });
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
