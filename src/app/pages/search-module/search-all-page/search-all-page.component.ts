import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Articles } from 'src/app/models/author-data.model';
import { AuthorsByInterest } from 'src/app/models/authors-by-interest.model';
import { MixSearchResponse } from 'src/app/models/mix-search-response.model';
import {
  Column,
  TableConfiguration,
} from 'src/app/models/table-configuration.model';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'search-all-page',
  templateUrl: './search-all-page.component.html',
  styleUrls: ['./search-all-page.component.css'],
})
export class SearchAllPageComponent implements OnInit, OnDestroy {
  key = '';
  data$!: Observable<MixSearchResponse>;
  dataTableConfiguration = new TableConfiguration<Articles>({
    data: [],
    columns: [
      new Column({
        name: 'title',
      }),
      new Column({
        name: 'writtenBy',
        width: '20rem',
      }),
      new Column({
        name: 'citedBy',
        width: '6rem',
        align: 'center',
      }),
      new Column({
        name: 'year',
        width: '6rem',
        align: 'center',
      }),
    ],
    nestedTables: [
      new TableConfiguration<AuthorsByInterest>({
        data: [],
        columns: [
          new Column({
            name: 'author',
            width: '12rem',
          }),
          new Column({
            name: 'openToCollab',
            width: '9rem',
            align: 'center',
          }),
          new Column({
            name: 'affiliation',
            width: '20rem',
          }),
          new Column({
            name: 'interests',
            width: '15rem',
          }),
          new Column({
            name: 'citedBy',
            width: '6rem',
            align: 'center',
          }),
        ],
      }),
    ],
  });

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataSvc: DataService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
