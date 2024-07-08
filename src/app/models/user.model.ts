export class User {
  public id!: number;
  public name!: string;
  public mail!: string;

  constructor(item: Partial<User>) {
    Object.assign(this, item);
  }
}
