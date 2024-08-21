import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SemiDonutConfiguration } from 'src/app/charts/configurations/semi-donut.configuration';
import { ChartColors } from 'src/app/charts/const/colors';

@Component({
  selector: 'semi-donut-chart',
  templateUrl: './semi-donut-chart.component.html',
  styleUrls: ['./semi-donut-chart.component.css'],
})
export class SemiDonutChartComponent implements OnInit {
  @Input() data!: SemiDonutConfiguration;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(public elm: ElementRef) {}

  ngOnInit(): void {
    const mainVal =
      this.data.mainValue != undefined
        ? this.data.mainValue
        : this.data.series.length;

    const self = this;

    this.chartOptions = {
      chart: {
        height: 'auto',
        margin: 0,
        backgroundColor: 'transparent',
        marginTop: 0,
        marginBottom: -10,
        marginLeft: 0,
        marginRight: 0,
      },
      exporting: { enabled: false },
      credits: { enabled: false },
      title:
        this.data.title != undefined
          ? this.data.title
          : {
              text: `${mainVal}`,
              align: 'center',
              verticalAlign: 'middle',
              y: 90,
            },
      subtitle: this.data.subtitle != undefined
      ? this.data.subtitle
      : {
          text: ``,
          align: 'center',
          verticalAlign: 'middle',
          y: 120,
        },
      navigator: {
        enabled: false,
      },
      tooltip: {
        formatter: function (p: any): string {
          return `${this.point.name}<p>${this.point.y} ${
            self.data?.unit ?? ''
          } (${this.point.percentage?.toFixed(2)}%)</p>`;
        },
        backgroundColor: '#EBD1BD',
        borderWidth: 0,
        borderRadius: 8,
        useHTML: true,
        outside: true,
        style: { color: 'black', padding: '0', fontSize: '14px', fontWeight: '600' },
      },
      xAxis: {
        margin: 0,
      },
      yAxis: {
        margin: 0,
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '100%',
        },
        series: {
          states: {
            hover: {
              halo: null,
            },
          },
        },
      },
      series: [
        {
          type: 'pie',
          innerSize: '80%',
          data: this.data.series
            .map((e, index) => {
              return {
                name: e.name,
                y: e.value,
                color: ChartColors.donut[index],
                dataLabels: {
                  enabled: false,
                },
                tooltipProperties: e.tootipProperties,
              };
            })
            .sort((a, b) => b.y - a.y),
        },
      ],
    };
  }
}
