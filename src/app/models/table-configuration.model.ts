import { Subject } from 'rxjs';

export class TableConfiguration<T> {
  constructor(item?: Partial<TableConfiguration<T>>) {
    if (item) Object.assign(this, item);
  }

  public data: any[] = [];
  public columns: Column[] = [];
  public nestedTables: TableConfiguration<T>[] = [];
}

export class Column {
  public name = '';
  public title = '';
  public width = 'auto';
  public align = 'left';
  public isImageColumn = false;

  constructor(item?: Partial<Column>) {
    if (item) Object.assign(this, item);
  }

//   public getIconFor(value: any): string {
//     const icons: any = {
//       manual: 'mail_outline',
//       automatic: 'schedule',
//       incidencia: 'notifications',
//       done: 'done',
//       warning: 'warning',
//     };
//     return icons[value];
//   }
}
