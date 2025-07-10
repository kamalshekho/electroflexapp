import { Component, signal } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Main } from './main/main';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Main],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isLeftSidebarCollapsed = signal<boolean>(true);
}
