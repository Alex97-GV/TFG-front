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
      articles: {
        totalNumberArticles: entity.articles.total_number_articles,
        notAvailable: entity.articles.not_available,
        available: entity.articles.available,
      },
      citedBy: {
        table: {
          citations: entity.cited_by.table.citations,
          hIndex: entity.cited_by.table.h_index,
          i10Index: entity.cited_by.table.i10_index,
        },
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
