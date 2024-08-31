export class AuthorsByInterestResponse {
  public authors!: AuthorsByInterest[];
  public nextPage!: string;
  public previousePage!: string;

  constructor(item: Partial<AuthorsByInterestResponse>) {
    Object.assign(this, item);
  }
}

export class AuthorsByInterest {
  public affiliation!: string;
  public authorId!: string;
  public citedBy!: number;
  public interests!: {
    keyword: string;
    title: string;
  }[];
  public name!: string;
  public openToCollab!: boolean;
  public picture!: string;

  constructor(item: Partial<AuthorsByInterest>) {
    Object.assign(this, item);
  }
}
