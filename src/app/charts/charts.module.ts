import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { SemiDonutChartComponent } from './components/semi-donut-chart/semi-donut-chart/semi-donut-chart.component';

@NgModule({
  declarations: [
    SemiDonutChartComponent
  ],
  imports: [CommonModule, HighchartsChartModule, LineChartComponent],
  exports: [LineChartComponent, SemiDonutChartComponent],
  providers: [],
})
export class ChartsModule {}
