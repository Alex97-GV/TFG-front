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

  search(data: any): Observable<Data> {
    let params = {};
    if (data.key) params = { ...params, key: data.key };

    return of({
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
    }).pipe(map((data) => this.toDataMapperService.transform(data)));
    // return this.baseApiSvc
    //   .get<DataDto>(`${this.url}`, params)
    //   .pipe(map((data) => this.toDataMapperService.transform(data)));
  }

  pruebaApi(key: string) {
    const params = {
      engine: 'google_scholar',
      q: '',
      hl: 'es',
      api_key:
        'd9f6757f8c03b67dce2a73f3ab5109697e4c795b6ff63dac5acfad099960a4b1',
    };

    if (key) params.q = key;

    return this.baseApiSvc
      .get<any>('https://serpapi.com/search.json', params)
      .subscribe((res) => {
        debugger;
      });
  }
}
