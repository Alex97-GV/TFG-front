export class AuthorSearchDataResponse {
  public authors!: AuthorSearchData[];
  public nextPage!: string;
  public previousePage!: string;

  constructor(item: Partial<AuthorSearchDataResponse>) {
    Object.assign(this, item);
  }
}

export class AuthorSearchData {
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

  constructor(item: Partial<AuthorSearchData>) {
    Object.assign(this, item);
  }
}
