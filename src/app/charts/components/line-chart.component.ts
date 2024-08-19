import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import {
  HighchartsChartComponent,
  HighchartsChartModule,
} from 'highcharts-angular';
import { BaseChart } from '../base-chart.class';
import { LineChartConfiguration } from '../configurations/line-chart-configurations';
import { ChartColors } from '../const/colors';

@Component({
  selector: 'line-chart',
  template: `<highcharts-chart
    #chart
    *ngIf="configuration"
    [Highcharts]="Highcharts"
    [options]="chartOptions"
  ></highcharts-chart>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./line-chart.component.css'],
  standalone: true,
  imports: [HighchartsChartModule, CommonModule],
})
export class LineChartComponent
  extends BaseChart
  implements OnInit, AfterViewInit
{
  @ViewChild(HighchartsChartComponent)
  chart!: HighchartsChartComponent;

  @Input() configuration!: LineChartConfiguration | undefined;
  @Input() htmlTitle = '';
  @Input() isTooltipShared = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  unitsSet!: string[];

  constructor(public override elm: ElementRef, public cd: ChangeDetectorRef) {
    super(elm);
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    debugger;
    const self = this;

    Highcharts.setOptions({
      scrollbar: { enabled: false },
      plotOptions: {
        series: {
          showInNavigator: true,
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    });

    this.chartOptions = {
      title: {
        text: this.htmlTitle
          ? this.htmlTitle
          : `<h3 class="m-0 px-3">${this.configuration?.title}</h3>`,
        align: 'left',
        useHTML: true,
        floating: false,
      },
      subtitle: this.configuration?.subtitle,
      chart: {
        height: this.height ?? 400,
        plotBorderWidth: 1,
        animation: false,
        zooming: {
          type: 'x',
        },
      },
      data: (this.configuration as LineChartConfiguration).data,
      xAxis: this.configuration?.xAxis?.map((xAxis, index) => {
        if (index == 0) {
          return {
            ...xAxis,
            endOnTick: true,
            labels: {
              rotation: xAxis.categories ? 0 : -30,
              style: {
                color: '#63676B',
              },
            },
            gridLineWidth: xAxis.categories ? 0 : 1,
            visible: true,
          };
        } else {
          return {
            ...xAxis,
            visible: false,
          };
        }
      }) as Highcharts.XAxisOptions[],
      plotOptions: {
        series: {
          borderWidth: 1,
          stickyTracking: false,
          allowPointSelect: true,
        },
        line: {
          visible: true,
          marker: {
            radius: 3,
          },
        },
      },
      yAxis: this.configuration?.yAxis.map((yAxis, index) => {
        if (index == 0) {
          return {
            title: {
              text: yAxis.label
                ? `${yAxis.label}`
                : '',
            },
            grid: {
              borderWidth: 1,
            },

            lineWidth: 1,
            gridLineWidth: 1,
            tickWidth: 1,
            opposite: index % 2 != 0,
            showLastLabel: false,
            stickyTracking: false,
          };
        }
        else {
          return {
            ...yAxis,
            visible: false,
          };
        }
      }),
      tooltip: {
        headerFormat: this.configuration?.xAxis[0]?.categories
          ? `{point.key}:00<br>`
          : `{point.key}<br>`,
        shared: this.isTooltipShared,
      },
      legend: {
        align: 'left',
        x: 57,
        maxHeight: 100,
      },
      series: this.configuration?.series.map((serie, index) => ({
        ...serie,
        type: 'line',
        stickyTracking: false,
        snap: 0,
        xAxis:
          this.configuration?.xAxis && this.configuration?.xAxis?.length > 1
            ? index
            : 0,
        color: serie.color
          ? serie.color
          : this.configuration?.colors?.length
          ? this.configuration.colors[index]
          : ChartColors.default,
        showInLegend: true,
        name: serie.name,
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b><br/>',
          valueSuffix: ` ${serie.unit}`,
        },
      })) as Highcharts.SeriesOptionsType[],
    };
  }
}
