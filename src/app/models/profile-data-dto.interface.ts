export interface ProfileDataDto {
  name: string;
  picture: string;
  interests: {
    keyword: string;
    title: string;
  }[];
  email: string;
  phone: string;
  affiliation: string;
  ssnn: {
    name: string;
    url: string;
  }[];
  open_to_collaborate: boolean;
  schoolar_id: string;
}
