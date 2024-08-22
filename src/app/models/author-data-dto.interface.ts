export interface AuthorDataDto {
  name: string;
  affiliations: string;
  interests: {
    title: string;
    keyword: string;
  }[];
  picture: string;
  article_info: {
    total_number_articles: number;
    not_available: number;
    available: number;
  };
  articles: any[];
  cited_by: {
    total_citations: number;
    graph: {
      year: number;
      citations: number;
    }[];
    average: number;
    open_to_collaborate: boolean;
  };
}
