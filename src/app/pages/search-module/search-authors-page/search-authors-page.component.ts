import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import {
  AuthorSearchData,
  AuthorSearchDataResponse,
} from 'src/app/models/author-search-data.model';
import {
  Column,
  TableConfiguration,
} from 'src/app/models/table-configuration.model';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'search-authors-page',
  templateUrl: './search-authors-page.component.html',
  styleUrls: ['./search-authors-page.component.css'],
})
export class SearchAuthorsPageComponent implements OnInit, OnDestroy {
  key = '';
  data$!: Observable<AuthorSearchDataResponse>;
  dataTableConfiguration = new TableConfiguration<AuthorSearchData>({
    data: [],
    columns: [
      new Column({
        name: 'author',
        title: 'Name',
        width: '12rem',
      }),
      new Column({
        name: 'openToCollab',
        title: 'Open to Collaborate',
        width: '9rem',
        align: 'center',
      }),
      new Column({
        name: 'affiliation',
        title: 'Affiliation',
        width: '18rem',
      }),
      new Column({
        name: 'interests',
        title: 'Interests',
        width: '15rem',
      }),
      new Column({
        name: 'citedBy',
        title: 'Cited By',
        width: '8rem',
        align: 'center',
      }),
    ],
  });

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataSvc: DataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((params) => {
        this.key = params.get('key') ?? '';
        if (this.key != '') {
          this.searchAuthors();
        }
      });
  }

  searchAuthors() {
    this.data$ = this.dataSvc.searchAuthors(this.key).pipe(
      takeUntil(this.componentDestroyed$),
      tap((res) => {
        this.dataTableConfiguration.data = res.authors;
      })
    );
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
