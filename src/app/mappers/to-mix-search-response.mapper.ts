import { Injectable } from '@angular/core';
import { MapperService } from './mapper.service';
import { MixSearchResponseDto } from '../models/mix-search-response-dto.interface';
import { MixSearchResponse } from '../models/mix-search-response.model';
import { AuthorsByInterest } from '../models/authors-by-interest.model';
import { Articles } from '../models/author-data.model';

@Injectable()
export class ToMixSearchResponseMapperService extends MapperService<
  MixSearchResponseDto,
  MixSearchResponse
> {
  protected map(entity: MixSearchResponseDto): MixSearchResponse {
    return new MixSearchResponse({
      authors: entity.authors.map(
        (author) =>
          new AuthorsByInterest({
            affiliation: author.affiliations,
            authorId: author.author_id,
            citedBy: author.cited_by,
            interests: author.interests.map((int) => ({
              keyword: int.keyword,
              title: int.title,
            })),
            name: author.name,
            openToCollab: author.open_to_collaborate,
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
            year: art.year,
          })
      ),
    });
  }
}
