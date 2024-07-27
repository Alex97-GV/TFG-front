import { Component, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Data,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  private readonly componentDestroyed$ = new Subject<void>();
  title = 'TFG';
  navBarVisibility!: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.manageNavBarVisibility();
  }
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  private manageNavBarVisibility() {
    this.router.events
      .pipe(
        takeUntil(this.componentDestroyed$),
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((evt) => {
        this.navBarVisibility = sessionStorage.getItem('user') !== null;
      });
  }
}
