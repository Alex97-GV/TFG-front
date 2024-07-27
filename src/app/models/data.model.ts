export class Data {
  public affiliation!: string;
  public citedby!: number;
  public emailDomain!: string;
  public filled!: boolean;
  public interests!: string[];
  public name!: string;
  public scholarId!: string;
  public source!: string;
  public urlPicture!: string;

  constructor(item: Partial<Data>) {
    Object.assign(this, item);
  }
}
