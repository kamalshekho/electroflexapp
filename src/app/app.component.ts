import { Component, HostListener, OnInit, signal } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { SMALL_SCREEN_WIDTH } from './constants/screen-sizes';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

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
