import { Articles } from './author-data.model';
import { AuthorSearchData } from './author-search-data.model';

export class MixSearchResponse {
  public authors!: AuthorSearchData[];
  public articles!: Articles[];

  constructor(item: Partial<MixSearchResponse>) {
    Object.assign(this, item);
  }
}
