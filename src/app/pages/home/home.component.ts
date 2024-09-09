import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Articles } from 'src/app/models/author-data.model';
import { AuthorSearchData } from 'src/app/models/author-search-data.model';
import { MixSearchResponse } from 'src/app/models/mix-search-response.model';
import {
  Column,
  TableConfiguration,
} from 'src/app/models/table-configuration.model';
import { DataService } from 'src/app/services/data-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  key = '';
  label = '';
  data$!: Observable<MixSearchResponse>;
  dataTableConfiguration = new TableConfiguration<AuthorSearchData>({
    data: [],
    height: '5rem',
    columns: [
      new Column({
        name: 'author',
        width: '12rem',
      }),
      new Column({
        name: 'openToCollab',
        width: '9rem',
        align: 'center',
      }),
      new Column({
        name: 'affiliation',
        width: '20rem',
      }),
      new Column({
        name: 'interests',
        width: '15rem',
      }),
      new Column({
        name: 'citedBy',
        width: '6rem',
        align: 'center',
      }),
    ],
    nestedTables: [
      new TableConfiguration<Articles>({
        data: [],
        columns: [
          new Column({
            name: 'title',
            width: '26.2rem',
          }),
          new Column({
            name: 'writtenBy',
            width: '34rem',
          }),
          new Column({
            name: 'citedBy',
            width: '9.7rem',
            align: 'center',
          }),
        ],
      }),
    ],
  });

  private readonly componentDestroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataSvc: DataService,
    private userSvc: UserService
  ) {}

  ngOnInit(): void {
    const int = sessionStorage.getItem('interests');
    if (int != null) {
      const interests = JSON.parse(int);
      this.getResults(interests);
    } else {
      const auxUser = sessionStorage.getItem('user');
      if (auxUser != null) {
        const user = JSON.parse(auxUser);
        this.userSvc
          .getUserInterests(user.mail)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe((res) => {
            debugger;
            let interests: any[] = [];
            res.userInterests.forEach((int) => {
              int.subcategories.forEach((sub) => {
                interests.push(sub);
              });
            });
            sessionStorage.setItem('interests', JSON.stringify(interests));
            this.getResults(interests);
          });
      }
    }
  }

  getResults(interests: any[]) {
    if (interests.length > 1) {
      const shuffled = interests.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);
      this.key = selected[0].title;
      this.label = selected[1].keyword;
    } else {
      this.key = interests[0].title;
      this.label = interests[0].keyword;
    }

    this.data$ = this.dataSvc.searchAll(this.key, this.label).pipe(
      takeUntil(this.componentDestroyed$),
      tap((res) => {
        this.dataTableConfiguration.data = res.authors;
        this.dataTableConfiguration.nestedTables[0].data = res.articles;
      })
    );
  }
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
