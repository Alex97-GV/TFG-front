import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AuthorData } from 'src/app/models/author-data.model';
import {
  Column,
  TableConfiguration,
} from 'src/app/models/table-configuration.model';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css'],
})
export class AuthorPageComponent implements OnInit, OnDestroy {
  id = '';
  data$!: Observable<AuthorData>;
  dataTableConfiguration = new TableConfiguration<AuthorData>({
    data: [],
    // nestedTables: [
    //   new TableConfiguration<any>({
    //     data: [],
    //     columns: [
    //       new Column({
    //         name: 'author',
    //         title: 'Author',
    //       }),
    //     ],
    //   }),
    // ],
    columns: [
      new Column({
        name: 'title',
        title: 'Title',
      }),
      new Column({
        name: 'writtenBy',
        title: 'Written By',
        width: '20rem',
      }),
      new Column({
        name: 'citedBy',
        title: 'Cyted By',
        width: '6rem',
        align: 'center',
      }),
      new Column({
        name: 'year',
        title: 'Year',
        width: '6rem',
        align: 'center',
      }),
    ],
  });

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataSvc: DataService
  ) {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((params) => (this.id = params.get('id') ?? ''));
  }

  ngOnInit(): void {
    if (this.id != '') {
      this.data$ = this.dataSvc.getAuthor(this.id).pipe(
        takeUntil(this.componentDestroyed$),
        tap((res) => {
          debugger;
          this.dataTableConfiguration.data = res.articles.data;
        })
      );
    }
  }

  searchInterest(interest: string) {
    //buscar interes clickado
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
