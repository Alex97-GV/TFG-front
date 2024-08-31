import { ArticleDto } from './author-data-dto.interface';
import { AuthorsByInterestDto } from './authors-by-interest-dto.interface';

export interface MixSearchResponseDto {
  authors: AuthorsByInterestDto[];
  articles: ArticleDto[];
}
