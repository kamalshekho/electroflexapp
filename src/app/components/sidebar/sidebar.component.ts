import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, Route, RouterModule } from '@angular/router';
import { MenuService } from '../../core/menu.service';
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

  menuItems: MenuItem[] = [];

  constructor(private router: Router) {
    this.menuItems = this.router.config
      .filter((route) => route.data?.['label'])
      .map((route) => ({
        routerLink: route.path || '',
        label: route.data!['label'],
        icon: route.data!['icon'],
      }));
  }

  public toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
  }

  public closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
