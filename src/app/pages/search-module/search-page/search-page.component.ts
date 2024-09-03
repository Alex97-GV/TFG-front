import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data-service';
import { SearchTypes } from '../types/search-types.type';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  key = '';
  searchType = 'all' as SearchTypes;

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(private location: Location, private router: Router) {
    const paramsRoute = this.location.path().split(/\//);
    this.searchType = paramsRoute[2] as SearchTypes;
    this.key = paramsRoute[3];
    this.changeLocation(this.searchType);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.componentDestroyed$),
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((evt) => {
        const paramsRoute = evt.url.split(/\//);
        this.searchType = paramsRoute[2] as SearchTypes;
        this.key = paramsRoute[3];
        this.changeLocation(this.searchType);
      });
  }

  changeLocation(searchType: SearchTypes) {
    this.searchType = searchType;
    const pathes = this.location.path().split(/\//);
    pathes.splice(2, 2);
    this.router.navigate([
      `${pathes.concat([this.searchType.toString(), this.key]).join('/')}`,
    ]);
  }

  getTitle(): string {
    return decodeURI(this.key);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
