import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TableConfiguration } from 'src/app/models/table-configuration.model';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  @Input() configuration = new TableConfiguration<any>();
  data!: any[];
  // componentDestroyed$ = new Subject<void>();

  constructor() {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   debugger;
  // }

  ngOnInit(): void {
    this.data = this.configuration.data ?? [];
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    // this.componentDestroyed$.next();
  }
}
