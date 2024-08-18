export class AuthorData {
  public name!: string;
  public picture!: string;
  public affiliations!: string;
  public interests!: {
    title: string;
    keyword: string;
  }[];
  public articles!: {
    totalNumberArticles: number;
    notAvailable: number;
    available: number;
    data: any[];
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
