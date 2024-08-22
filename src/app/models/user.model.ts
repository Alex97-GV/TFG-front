export class User {
  public openToCollaborate!: boolean;
  public name!: string;
  public mail!: string;

  constructor(item: Partial<User>) {
    Object.assign(this, item);
  }
}
