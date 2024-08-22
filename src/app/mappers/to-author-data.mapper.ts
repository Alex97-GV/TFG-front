import { Injectable } from '@angular/core';
import { MapperService } from './mapper.service';
import { AuthorDataDto } from '../models/author-data-dto.interface';
import { AuthorData } from '../models/author-data.model';

@Injectable()
export class ToAuthorDataMapperService extends MapperService<
  AuthorDataDto,
  AuthorData
> {
  protected map(entity: AuthorDataDto): AuthorData {
    return new AuthorData({
      name: entity.name,
      affiliations: entity.affiliations,
      interests: entity.interests.map((int) => ({
        title: int.title,
        keyword: int.keyword,
      })),
      picture: entity.picture,
      articleInfo: {
        totalNumberArticles: entity.article_info.total_number_articles,
        notAvailable: entity.article_info.not_available,
        available: entity.article_info.available,
      },
      articles: entity.articles,
      citedBy: {
        totalCitations: entity.cited_by.total_citations,
        graph: entity.cited_by.graph.map((gr) => {
          return {
            year: gr.year,
            citations: gr.citations,
          };
        }),
        average: entity.cited_by.average,
        openToCollaborate: entity.cited_by.open_to_collaborate,
      },
    });
  }
}
