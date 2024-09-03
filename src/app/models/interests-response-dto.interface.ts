export interface InterestsResponseDto {
  interests: InterestDto[];
  user_interests: InterestDto[];
}

export interface InterestDto {
  main_category: string;
  subcategories: {
    keyword: string;
    title: string;
  }[];
}
