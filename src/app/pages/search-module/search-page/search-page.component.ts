import { Location } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Data } from 'src/app/models/data.model';
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
  data$!: Observable<Data[]>;

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dataSvc: DataService,
    private router: Router
  ) {
    const paramsRoute = this.location.path().split(/\//);
    this.searchType = paramsRoute[2] as SearchTypes;
    this.key = paramsRoute[3];
    this.changeLocation(this.searchType);
  }

  ngOnInit(): void {
    if (this.key != '') {
      this.dataSvc
        .search(this.key, this.searchType)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe((res) => {});
    }

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

  search() {
    this.data$ = this.dataSvc
      .search(this.key, this.searchType)
      .pipe(takeUntil(this.componentDestroyed$));
  }

  changeLocation(searchType: SearchTypes) {
    this.searchType = searchType;
    const pathes = this.location.path().split(/\//);
    pathes.splice(2, 2);
    this.router.navigate([
      `${pathes.concat([this.searchType.toString(), this.key]).join('/')}`,
    ]);
    this.search();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
