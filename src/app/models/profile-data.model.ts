export class ProfileData {
  public openToCollaborate!: boolean;
  public generalInfo!: {
    fullName: string;
    picture: string;
    interests: { keyword: string; title: string }[];
    affiliation: string;
    email: string;
    phone: string;
  };
  public socials!: { name: string; url: string }[];
  public id!: string;

  constructor(item: Partial<ProfileData>) {
    Object.assign(this, item);
  }
}
