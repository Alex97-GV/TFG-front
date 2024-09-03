import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ToAuthorDataMapperService } from '../mappers/to-author-data.mapper';
import { ToAuthorSearchDataMapperService } from '../mappers/to-author-search-data.mapper';
import { ToMixSearchResponseMapperService } from '../mappers/to-mix-search-response.mapper';
import { AuthorDataDto } from '../models/author-data-dto.interface';
import { AuthorData } from '../models/author-data.model';
import { AuthorSearchDataResponseDto } from '../models/author-search-data-dto.interface';
import { AuthorSearchDataResponse } from '../models/author-search-data.model';
import { MixSearchResponseDto } from '../models/mix-search-response-dto.interface';
import { MixSearchResponse } from '../models/mix-search-response.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private baseApiSvc: BaseApiService,
    private toAuthorDataMapperService: ToAuthorDataMapperService,
    private toAuthorSearchDataMapperService: ToAuthorSearchDataMapperService,
    private toMixSearchResponseMapperService: ToMixSearchResponseMapperService
  ) {}

  private readonly urlBase = 'http://127.0.0.1:5000/api/';

  searchAll(keyword: string, label: string): Observable<MixSearchResponse> {
    const params = {
      query: keyword,
      label: label,
    };
    return this.baseApiSvc
      .get<MixSearchResponseDto>(
        `${this.urlBase}search_articles_and_authors`,
        params
      )
      .pipe(
        map((data) => this.toMixSearchResponseMapperService.transform(data))
      );
  }

  searchAuthorsByInterests(
    keyword: string
  ): Observable<AuthorSearchDataResponse> {
    const params = {
      label: keyword,
    };

    return this.baseApiSvc
      .get<AuthorSearchDataResponseDto>(
        `${this.urlBase}search_authors_by_interests`,
        params
      )
      .pipe(
        map((res) => {
          return this.toAuthorSearchDataMapperService.transform(res);
        })
      );
  }

  searchAuthors(keyword: string): Observable<AuthorSearchDataResponse> {
    const params = { query: keyword };

    return this.baseApiSvc
      .get<AuthorSearchDataResponseDto>(
        `${this.urlBase}search_authors_by_name`,
        params
      )
      .pipe(
        map((res) => {
          return this.toAuthorSearchDataMapperService.transform(res);
        })
      );
  }

  getAuthor(id: string): Observable<AuthorData> {
    const params = {
      author_id: id,
    };

    return this.baseApiSvc
      .get<AuthorDataDto>(`${this.urlBase}search_author_id`, params)
      .pipe(
        map((res) => {
          return this.toAuthorDataMapperService.transform(res);
        })
      );
  }
}
