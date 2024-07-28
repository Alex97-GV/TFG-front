import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Data } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  key = '';
  data$!: Observable<Data[]>;

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataSvc: DataService
  ) {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((params) => {
        this.key = params.get('key') ?? '';
      });
  }

  ngOnInit(): void {
    if (this.key != '') {
      this.data$ = this.dataSvc
        .search(this.key)
        .pipe(takeUntil(this.componentDestroyed$));
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
