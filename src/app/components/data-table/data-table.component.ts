import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { TableConfiguration } from 'src/app/models/table-configuration.model';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  @Input() configuration = new TableConfiguration<any>();
  data!: any[];
  nestedData!: any[];
  // componentDestroyed$ = new Subject<void>();

  constructor(private router: Router) {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   debugger;
  // }

  ngOnInit(): void {
    debugger;
    this.data = this.configuration.data ?? [];
    this.nestedData = this.configuration.nestedTables[0].data ?? [];
  }

  getInterests(interests: any[]) {
    if (interests) return interests.map((int) => int.title).join(', ');
    return '';
  }

  goToAuthor(id: string) {
    this.router.navigate([`/author/${id}`]);
  }

  searchInterests(keyword: string) {
    this.router.navigate([`search/interests/${keyword}`]);
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    // this.componentDestroyed$.next();
  }
}
