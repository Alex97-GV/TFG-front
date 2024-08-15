export class AuthorData {
  public name!: string;
  public affiliations!: string;
  public interests!: {
    title: string;
    keyword: string;
  }[];
  public picture!: string;
  public articles!: {
    totalNumberArticles: number;
    notAvailable: number;
    available: number;
  };
  public citedBy!: {
    table: {
      citations: number;
      hIndex: number;
      i10Index: number;
    };
    graph: {
      year: number;
      citations: number;
    }[];
    average: number;
    openToCollaborate: boolean;
  };

  constructor(item: Partial<AuthorData>) {
    Object.assign(this, item);
  }
}
