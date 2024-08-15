import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthorData } from 'src/app/models/author-data.model';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css'],
})
export class AuthorPageComponent implements OnInit {
  id = '';
  data$!: Observable<AuthorData>;

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataSvc: DataService
  ) {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((params) => (this.id = params.get('id') ?? ''));
  }

  ngOnInit(): void {
    if (this.id != '') {
      this.data$ = this.dataSvc
        .getAuthor(this.id)
        .pipe(takeUntil(this.componentDestroyed$));
    }
  }
}
