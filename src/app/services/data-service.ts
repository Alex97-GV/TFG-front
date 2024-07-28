import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { map, Observable, of } from 'rxjs';
import { Data } from '../models/data.model';
import { ToDataMapperService } from '../mappers/to-data.mapper';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private baseApiSvc: BaseApiService,
    private toDataMapperService: ToDataMapperService
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
}
