export interface AuthorDataDto {
  name: string;
  affiliations: string;
  interests: {
    title: string;
    keyword: string;
  }[];
  picture: string;
  articles: {
    total_number_articles: number;
    not_available: number;
    available: number;
    data: any[];
  };
  cited_by: {
    table: {
      citations: number;
      h_index: number;
      i10_index: number;
    };
    graph: {
      year: number;
      citations: number;
    }[];
    average: number;
    open_to_collaborate: boolean;
  };
}
