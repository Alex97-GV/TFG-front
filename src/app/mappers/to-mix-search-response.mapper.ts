import { Injectable } from '@angular/core';
import { Articles } from '../models/author-data.model';
import { AuthorSearchData } from '../models/author-search-data.model';
import { MixSearchResponseDto } from '../models/mix-search-response-dto.interface';
import { MixSearchResponse } from '../models/mix-search-response.model';
import { MapperService } from './mapper.service';

@Injectable()
export class ToMixSearchResponseMapperService extends MapperService<
  MixSearchResponseDto,
  MixSearchResponse
> {
  protected map(entity: MixSearchResponseDto): MixSearchResponse {
    return new MixSearchResponse({
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
      articles: entity.articles.map(
        (art) =>
          new Articles({
            authors: art.authors,
            citedBy: art.cited_by,
            link: art.link,
            title: art.title,
          })
      ),
    });
  }
}
