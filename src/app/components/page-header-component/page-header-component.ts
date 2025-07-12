import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header-component.html',
  styleUrl: './page-header-component.css',
})
export class PageHeaderComponent {
  public pageTitle: string | undefined;
  public pageIcon: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.getChild(this.route);
        this.pageTitle = currentRoute.snapshot.data['label'];
        this.pageIcon = currentRoute.snapshot.data['icon'];
      });
  }

  getChild(route: ActivatedRoute): ActivatedRoute {
    if (route.firstChild) {
      return this.getChild(route.firstChild);
    } else {
      return route;
    }
  }
}
