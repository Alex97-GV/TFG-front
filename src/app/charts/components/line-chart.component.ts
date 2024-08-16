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

@Component({
  selector: 'line-chart',
  template: `<highcharts-chart
    #chart
    [Highcharts]="Highcharts"
    [options]="chartOptions"
  ></highcharts-chart>`,
  styleUrls: ['./line-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [HighchartsChartModule, CommonModule],
})
export class LineChartComponent
  extends BaseChart
  implements OnInit, AfterViewInit
{
  @ViewChild(HighchartsChartComponent)
  chart!: HighchartsChartComponent;

  @Input() actionsButtonsTop = 0;
  @Input() htmlTitle = '';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  unitsSet!: string[];
  //   configuration!: LineChartConfiguration;

  constructor(public override elm: ElementRef, public cd: ChangeDetectorRef) {
    super(elm);
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    const self = this;

    Highcharts.setOptions({
      chart: {
        type: 'line',
      },

      title: {
        text: 'U.S Solar Employment Growth',
        align: 'left',
      },

      subtitle: {
        text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
        align: 'left',
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      yAxis: {
        title: {
          text: 'Number of Employees',
        },
      },
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2022',
        },
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },
      series: [
        {
          name: 'Installation & Developers',
          data: [
            43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
            161454, 154610, 168960, 171558,
          ],
        },
        {
          name: 'Manufacturing',
          data: [
            24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726,
            34243, 31050, 33099, 33473,
          ],
        },
        {
          name: 'Sales & Distribution',
          data: [
            11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243,
            29213, 25663, 28978, 30618,
          ],
        },
        {
          name: 'Operations & Maintenance',
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            11164,
            11218,
            10077,
            12530,
            16585,
          ],
        },
        {
          name: 'Other',
          data: [
            21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906,
            10073, 11471, 11648,
          ],
        },
      ] as Highcharts.SeriesOptionsType[],
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

    // Highcharts.setOptions({
    //   scrollbar: { enabled: false },
    //   plotOptions: {
    //     series: {
    //       showInNavigator: true,
    //     },
    //   },
    // });

    // this.chartOptions = {
    //   chart: {
    //     height: this.height ?? 400,
    //     plotBorderWidth: 1,
    //     animation: false,
    //     zooming: {
    //       type: 'x',
    //     },
    //   },
    //   //   data: (this.configuration as LineChartConfiguration).data,
    //   title: {
    //     text: this.htmlTitle,
    //     //   ? this.htmlTitle
    //     //   : `<h3 class="m-0 px-3">${this.configuration?.title}</h3>`,
    //     align: 'left',
    //     useHTML: true,
    //     floating: false,
    //   },
    //   plotOptions: {
    //     series: {
    //         borderWidth: 1,
    //       stickyTracking: false,
    //       allowPointSelect: true,
    //     },
    //     line: {
    //         visible: true,
    //         marker: {
    //             radius: 3
    //         }
    //     },
    //   },
    //   legend: {
    //     align: 'left',
    //     x:57,
    //     maxHeight: 100,
    //   },
    //   series: ([
    //     {
    //         type: 'line',
    //         stickyTracking: false,
    //         color: 'yellow',
    //         showInLegend: true,
    //         // name: serie.name,

    //     }
    //   ]) as Highcharts.SeriesOptionsType[]
    // };
  }

  setActionsButtonPosition(): void {
    const button: any = this.elm.nativeElement.querySelector(
      '.highcharts-contextbutton'
    );
    button.setAttribute(
      'transform',
      `translate(${button.getAttribute('transform').match(/\d+/)[0]},${
        this.actionsButtonsTop
      })`
    );
  }
}
