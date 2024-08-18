import { ChartColors } from "../const/colors";

export abstract class CharBaseConfiguration<T> {
  constructor(item?: Partial<CharBaseConfiguration<T>>) {
    if (!item) return;
    Object.assign(this, item);
    if (item.xAxis) this.xAxis = item.xAxis?.map((ax) => new XAxis(ax));
    if (item.yAxis) this.yAxis = item.yAxis.map((ax) => new YAxis(ax));
    this.series = (item.series || []).map((serie) => new Serie(serie));
  }

  public title = '';
  public xAxis: XAxis[] = [new XAxis()];
  public yAxis: YAxis[] = [new YAxis()];
  public series: Serie<T>[] = [];
  public colors: string[] = ChartColors.line;

}

export class YAxis {
  constructor(item?: Partial<YAxis>) {
    if (!item) return;
    Object.assign(this, item);
  }
  public label?: string;
  public format?: string;
  public labelFormat?: string;
  public min?: number;
  public max?: number;
}

export class XAxis extends YAxis {
  constructor(item?: Partial<XAxis>) {
    super(item);
    if (!item) return;
    Object.assign(this, item);
  }

  public categories?: string[];
  public tickInterval?: number;
}

export class Serie<T> {
    constructor(item?: Partial<Serie<T>>) {
      if (!item) return;
      Object.assign(this, item);
    }
  
    public name = '';
    public data: T | undefined = undefined;
    public colsize?: number;
    public unit?: string;
    public tooltip?: any;
    public yAxis?: number;
    public zIndex?: number;
    public baseSeries?: number;
    public type?: string;
    public color?: string;
  }
