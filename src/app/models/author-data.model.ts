export class AuthorData {
  public name!: string;
  public picture!: string;
  public affiliations!: string;
  public interests!: {
    title: string;
    keyword: string;
  }[];
  public articleInfo!: {
    totalNumberArticles: number;
    notAvailable: number;
    available: number;
  };
  public articles!: Articles[];
  public citedBy!: {
    totalCitations: number;
    graph: {
      year: number;
      citations: number;
    }[];
    average: number;
  };
  public openToCollaborate!: boolean;

  constructor(item: Partial<AuthorData>) {
    Object.assign(this, item);
  }
}

export class Articles {
  public authors!: string;
  public citedBy!: number;
  public link!: string;
  public title!: string;
  public year!: string;

  constructor(item: Partial<Articles>) {
    Object.assign(this, item);
  }
}
