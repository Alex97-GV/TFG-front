import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit{
  @Input() data!: any;
  @Input() title!: string;

  constructor(){}

  ngOnInit(): void {
    debugger;
  }
}
