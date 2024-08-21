import { SubtitleOptions, TitleOptions, Tooltip, TooltipOptions } from 'highcharts';

export class SemiDonutConfiguration {
  icon?: string;
  title?: TitleOptions;
  subtitle?: SubtitleOptions;
  unit!: string;
  mainValue?: number;
  series!: {
    name: string;
    value: number;
    tootipProperties: {
      name: string;
      value: number;
      percentage?: number;
    }[];
  }[];

  constructor(item: SemiDonutConfiguration) {
    Object.assign(this, item);
  }
}
