import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { map, Observable, of, takeUntil } from 'rxjs';
import { Data } from '../models/data.model';
import { ToDataMapperService } from '../mappers/to-data.mapper';
import { AuthorDataDto } from '../models/author-data-dto.interface';
import { AuthorData } from '../models/author-data.model';
import { ToAuthorDataMapperService } from '../mappers/to-author-data.mapper';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private baseApiSvc: BaseApiService,
    private toDataMapperService: ToDataMapperService,
    private toAuthorDataMapperService: ToAuthorDataMapperService
  ) {}

  search(data: any): Observable<Data[]> {
    let params = {};
    if (data.key) params = { ...params, key: data.key };

    return of([
      {
        affiliation: 'Postdoctoral research assistant, University of Bremen',
        citedby: 56666,
        email_domain: '@collision-detection.com',
        filled: false,
        interests: [
          'Computer Graphics',
          'Collision Detection',
          'Haptics',
          'Geometric Data Structures',
        ],
        name: 'Rene Weller',
        scholar_id: 'lHrs3Y4AAAAJ',
        source: 'SEARCH_AUTHOR_SNIPPETS',
        url_picture:
          'https://scholar.google.com/citations?view_op=medium_photo&user=lHrs3Y4AAAAJ',
      },
      {
        affiliation: 'Postdoctoral research assistant, University of Bremen',
        citedby: 56666,
        email_domain: '@collision-detection.com',
        filled: false,
        interests: [
          'Computer Graphics',
          'Collision Detection',
          'Haptics',
          'Geometric Data Structures',
        ],
        name: 'Rene Weller',
        scholar_id: 'lHrs3Y4AAAAJ',
        source: 'SEARCH_AUTHOR_SNIPPETS',
        url_picture:
          'https://scholar.google.com/citations?view_op=medium_photo&user=lHrs3Y4AAAAJ',
      },
    ]).pipe(map((data) => this.toDataMapperService.transform(data)));
    // return this.baseApiSvc
    //   .get<DataDto>(`${this.url}`, params)
    //   .pipe(map((data) => this.toDataMapperService.transform(data)));
  }

  saveInterests(interestsList: string[]): Observable<any> {
    const body = {
      interests: interestsList,
    };

    return of({ save: true });

    // return this.baseApiSvc
    //   .post<any>(`${this.url}`, body)
    //   .pipe(map((res) => this.toResponseInterestsMapperService.transform(res)));
  }

  getAuthor(id: string): Observable<AuthorData> {
    const params = {
      author_id: id,
    };

    return this.baseApiSvc
      .get<AuthorDataDto>(`http://127.0.0.1:5000/api/search_author_id`, params)
      .pipe(
        map((res) => {
          return this.toAuthorDataMapperService.transform(res);
        })
      );
  }
}
