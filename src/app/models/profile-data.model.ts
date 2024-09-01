export class ProfileData {
  public openToCollab!: boolean;
  public generalInfo!: {
    fullName: string;
    picture: string;
    interests: { keyword: string; title: string }[];
    affiliation: string;
    email: string;
    phone: string;
  };
  public socials!: { items: { name: string; url: string }[] };
  public id!: string;

  constructor(item: Partial<ProfileData>) {
    Object.assign(this, item);
  }
}
