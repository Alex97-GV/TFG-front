import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TableConfiguration } from 'src/app/models/table-configuration.model';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy{
  @Input() configuration = new TableConfiguration<any>();
  data!: any[];
  // componentDestroyed$ = new Subject<void>();

  constructor(){}
    
  ngOnInit(): void {
    debugger;
    this.data = this.configuration.data ?? [];
  }

  ngOnDestroy(): void {
    // this.componentDestroyed$.next();
  }
}
