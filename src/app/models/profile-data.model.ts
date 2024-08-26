export class ProfileData {
  public name!: string;
  public picture!: string | null;
  public interests!: { keyword: string; title: string }[];
  public email!: string;
  public phone!: string;
  public affiliation!: string;
  public ssnn!: { name: string; url: string }[];
  public openToCollaborate!: boolean;
  public id!: string | null;

  constructor(item: Partial<ProfileData>) {
    Object.assign(this, item);
  }
}
