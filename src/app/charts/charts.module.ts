import { NgModule } from '@angular/core';
import { LineChartComponent } from './components/line-chart.component';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [],
  imports: [CommonModule, HighchartsChartModule, LineChartComponent],
  exports: [LineChartComponent],
  providers: [],
})
export class ChartsModule {}
