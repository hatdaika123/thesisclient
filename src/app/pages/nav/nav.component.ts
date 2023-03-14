import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  public ITEMS = [
    { label: 'home', icon: 'home', route: 'expense' },
    { label: 'dashboard', icon: 'analytics', route: 'dashboard' },
    { label: 'category', icon: 'category', route: 'category' },
    { label: 'user', icon: 'person', route: 'profile' }
  ];

  public currentRoute?: string = 'expense';

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initRoute();
    this.listenRouteChange();
  }

  initRoute(): void {
    this.currentRoute = this.router.url.split('/')[2];
    this.cd.detectChanges();
  }

  listenRouteChange(): void {
    this.router
      .events
      .pipe(
        filter(event => event instanceof NavigationStart),
        map(event => {
          return (event as NavigationStart)
            .url
            .split('/')[2];
        })
      )
      .subscribe({
        next: val => {
          this.currentRoute = val;
          this.cd.detectChanges();
        }
      });
  }

}
