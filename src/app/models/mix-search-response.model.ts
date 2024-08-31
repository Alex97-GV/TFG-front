import { Articles } from './author-data.model';
import { AuthorsByInterest } from './authors-by-interest.model';

export class MixSearchResponse {
  public authors!: AuthorsByInterest[];
  public articles!: Articles[];

  constructor(item: Partial<MixSearchResponse>) {
    Object.assign(this, item);
  }
}
