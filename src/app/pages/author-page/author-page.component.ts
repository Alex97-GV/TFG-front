import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import {
  Serie,
  XAxis,
  YAxis,
} from 'src/app/charts/configurations/base-chart-configuration';
import { LineChartConfiguration } from 'src/app/charts/configurations/line-chart-configurations';
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
  lineChartConfig!: LineChartConfiguration;
  dataTableConfiguration = new TableConfiguration<AuthorData>({
    data: [],
    // nestedTables: [
    //   new TableConfiguration<any>({
    //     data: [],
    //     columns: [
    //       new Column({
    //         name: 'author',
    //         title: '',
    //       }),
    //       new Column({
    //         name: 'citedBy',
    //         title: '',
    //         align:'center'
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
          this.lineChartConfig = this.getLineChartConfiguration(
            res.citedBy.graph
          );
        })
      );
    }
  }

  getLineChartConfiguration(data: any) {
    return new LineChartConfiguration({
      title: 'Citations Evolution',
      // xAxis: [
      //   new XAxis({
      //     min: data[0].year,
      //     max: data[data.length - 1].year,
      //   }),
      // ],
      // yAxis: [
      //   new YAxis({
      //     min: (data.map((cit:any) => cit.citations)).reduce((a: number,b: number) => Math.min(a, b)),
      //     max: data.map((cit:any) => cit.citations).reduce((a: number,b: number) => Math.max(a, b)),
      //   })
      // ],
      legend: {
        align: 'left',
        x: 57,
      },
      series: data.map((cit: any) => {
        return new Serie({
          name: cit.year,
          data: cit.citations,
        });
      }),
    });
  }

  searchInterest(interest: string) {
    //buscar interes clickado
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
