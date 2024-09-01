export interface AuthorSearchDataResponseDto {
  authors: AuthorSearchDataDto[];
}

export interface AuthorSearchDataDto {
  affiliations: string;
  author_id: string;
  cited_by: number;
  interests: {
    keyword: string;
    title: string;
  }[];
  name: string;
  open_to_collaborate: boolean;
  picture: string;
}
