import { Injectable } from '@angular/core';
import { AuthorSearchDataResponseDto } from '../models/author-search-data-dto.interface';
import {
  AuthorSearchData,
  AuthorSearchDataResponse,
} from '../models/author-search-data.model';
import { MapperService } from './mapper.service';

@Injectable()
export class ToAuthorSearchDataMapperService extends MapperService<
  AuthorSearchDataResponseDto,
  AuthorSearchDataResponse
> {
  protected map(entity: AuthorSearchDataResponseDto): AuthorSearchDataResponse {
    return new AuthorSearchDataResponse({
      authors: entity.authors.map(
        (author) =>
          new AuthorSearchData({
            affiliation: author.affiliations,
            authorId: author.author_id,
            citedBy: author.cited_by,
            interests: author.interests.map((int) => ({
              keyword: int.keyword,
              title: int.title,
            })),
            name: author.name,
            openToCollab: Math.random() < 0.5,
            picture: author.picture,
          })
      ),
    });
  }
}
