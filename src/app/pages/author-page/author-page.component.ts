import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import {
  Serie,
  XAxis,
  YAxis,
} from 'src/app/charts/configurations/base-chart-configuration';
import { LineChartConfiguration } from 'src/app/charts/configurations/line-chart-configurations';
import { SemiDonutConfiguration } from 'src/app/charts/configurations/semi-donut.configuration';
import { ChartColors } from 'src/app/charts/const/colors';
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
  semiDonutConfig!: SemiDonutConfiguration;
  dataTableConfiguration = new TableConfiguration<AuthorData>({
    data: [],
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
          this.dataTableConfiguration.data = res.articles;
          this.lineChartConfig = this.getLineChartConfiguration(
            res.citedBy.graph
          );
          this.semiDonutConfig = this.getSemiDonutConfiguration(
            res.articleInfo
          );
        })
      );
    }
  }

  getLineChartConfiguration(data: any) {
    return new LineChartConfiguration({
      title: 'Citations Evolution',
      subtitle: {
        text: 'Source: Google Scholar',
        align: 'left',
        x: 20,
      },
      xAxis: [
        new XAxis({
          min: data[0].year,
          max: data[data.length - 1].year,
        }),
      ],
      yAxis: [
        new YAxis({
          label: 'Nº Citations',
        }),
      ],
      colors: ChartColors.line,
      series: [
        new Serie({
          name: 'Cited By',
          data: data.map((cit: any) => [cit.year, cit.citations]),
          unit: 'citations',
        }),
      ],
    });
  }

  getSemiDonutConfiguration(data: any) {
    debugger;
    return new SemiDonutConfiguration({
      title: {
        text: `${data.totalNumberArticles}`,
        align: 'center',
        verticalAlign: 'middle',
        y: 100,
        style: {
          fontWeight: '600',
          fontSize: '60px',
        },
      },
      subtitle: {
        text: 'Total Articles',
        align: 'center',
        verticalAlign: 'middle',
        y: 120,
        style: {
          fontWeight: '600',
          fontSize: '20px',
        },
      },
      mainValue: data.totalNumberArticles,
      unit: 'articles',
      series: [
        {
          name: 'Available',
          value: data.available,
          tootipProperties: [
            {
              name: 'Articles',
              value: data.available,
            },
          ],
        },
        {
          name: 'Not Available',
          value: data.notAvailable,
          tootipProperties: [
            {
              name: 'Articles',
              value: data.notAvailable,
            },
          ],
        },
      ],
    });
  }

  searchInterest(interest: string) {
    //buscar interes clickado
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
