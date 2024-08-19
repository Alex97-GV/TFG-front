import { LegendOptions } from 'highcharts';
import { CharBaseConfiguration } from './base-chart-configuration';

export class LineChartConfiguration extends CharBaseConfiguration<
  (number | null | undefined)[][]
> {
  public legend?: LegendOptions;
  public data: any;

  constructor(item?: Partial<LineChartConfiguration>) {
    super(item);
    if (item) Object.assign(this, item);
  }
}
