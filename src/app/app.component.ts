import { Component, HostListener, OnInit, signal } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { SMALL_SCREEN_WIDTH } from './constants/screen-sizes';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SidebarComponent, MainComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  showSidebarAndHeader = signal(true);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const noSidebarRoutes = ['/auth'];
        this.showSidebarAndHeader.set(
          !noSidebarRoutes.includes(event.urlAfterRedirects),
        );
      });
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < SMALL_SCREEN_WIDTH) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < SMALL_SCREEN_WIDTH);
  }

  public changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
