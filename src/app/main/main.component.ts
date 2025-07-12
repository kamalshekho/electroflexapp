import { NgClass } from '@angular/common';
import { Component, computed, input, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SMALL_SCREEN_WIDTH } from '../constants/screen-sizes';
import { PageHeaderComponent } from '../components/page-header-component/page-header-component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NgClass, PageHeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();

  //If Signals changes (isLeftSidebarCollapsed, screenWidth) computed() is automatically recalculated
  sizeClass = computed(() => {
    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
    if (isLeftSidebarCollapsed) {
      return '';
    }
    return this.screenWidth() > SMALL_SCREEN_WIDTH
      ? 'body-trimmed'
      : 'body-md-screen';
  });
}
