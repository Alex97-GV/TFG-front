import { ArticleDto } from './author-data-dto.interface';
import { AuthorSearchDataDto } from './author-search-data-dto.interface';

export interface MixSearchResponseDto {
  authors: AuthorSearchDataDto[];
  articles: ArticleDto[];
}
