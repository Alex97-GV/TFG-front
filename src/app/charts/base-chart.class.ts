import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import HC_exportData from 'highcharts/modules/export-data';
import HC_exporting from 'highcharts/modules/exporting';

HC_exporting(Highcharts);
HC_exportData(Highcharts);

@Component({ template: '' })
export class BaseChart implements OnChanges {
  @Input() width: number | undefined;
  @Input() height: number | undefined;
  @Input() export = false;

  constructor(public elm: ElementRef) {
    Highcharts.setOptions({
      exporting: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      navigator: {
        enabled: false,
      },
      scrollbar: { enabled: false },
      legend: {
        enabled: true,
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['export']) {
      Highcharts.setOptions({
        chart: {
          spacingTop: 25,
        },
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: [
                'downloadPNG',
                'downloadJPEG',
                'downloadPDF',
                'downloadSVG',
                'separator',
                'downloadCSV',
                'downloadXLS',
              ],
              y: -25,
            },
          },
        },
      });
    }
  }

  ngAfterViewInit(): void {
    const svg = this.elm.nativeElement.querySelector('svg');
    if (svg) {
      svg.style =
        (this.width ? `max-width:${this.width}px;` : '') +
        (this.height ? `max-height:${this.height}px;` : '');
      // Solución para que el gráfico se adapte al contendor
      if (!this.width) svg.setAttribute('width', '100%');
    }
  }

  public convertChartToPng(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const charts: HTMLElement[] = Array.from(
          this.elm.nativeElement.querySelectorAll('.content highcharts-chart')
        );
        charts.forEach((container: HTMLElement) => {
          Array.from(container.querySelectorAll('text')).forEach(
            (text: any) => {
              const isTitle =
                -1 != Array.from(text.classList).indexOf('highcharts-title');
              text.style.fontFamily =
                '"Open Sans", Roboto, "Helvetica Neue", sans-serif';
              text.style.color = '#000';
              text.style.fontSize = `${isTitle ? 12 : 11}px`;
              text.style.fontWeight = `${isTitle ? 500 : 100}`;
            }
          );

          const svg: SVGSVGElement | null = container.querySelector('svg');
          if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const img = document.createElement('img');
            img.setAttribute('width', '100%');
            img.setAttribute('height', 'auto');
            img.src = `data:image/svg+xml;base64,${btoa(
              unescape(encodeURIComponent(svgData))
            )}`;
            // const table = document.createElement('table');
            // table.innerHTML = `<tr><td>${img.outerHTML}</td></tr>`;
            // container.parentElement?.prepend(table);
            // container.parentElement?.removeChild(container);

            container.parentElement?.prepend(img);
            container.parentElement?.removeChild(container);
          }
        });
        resolve(true);
      }, 500);
    });
  }
}
