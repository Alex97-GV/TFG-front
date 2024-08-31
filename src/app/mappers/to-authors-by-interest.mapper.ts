import { Injectable } from '@angular/core';
import { AuthorsByInterestResponseDto } from '../models/authors-by-interest-dto.interface';
import {
  AuthorsByInterest,
  AuthorsByInterestResponse,
} from '../models/authors-by-interest.model';
import { MapperService } from './mapper.service';

@Injectable()
export class ToAuthorsByInterestsMapperService extends MapperService<
  AuthorsByInterestResponseDto,
  AuthorsByInterestResponse
> {
  protected map(
    entity: AuthorsByInterestResponseDto
  ): AuthorsByInterestResponse {
    return new AuthorsByInterestResponse({
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
    });
  }
}
