export class InterestsResponse {
  public interests!: Interest[];
  public userInterests!: Interest[];

  constructor(item: Partial<InterestsResponse>) {
    Object.assign(this, item);
  }
}

export class Interest {
  public mainCategory!: string;
  public subcategories!: {
    keyword: string;
    title: string;
  }[];

  constructor(item: Partial<Interest>) {
    Object.assign(this, item);
  }
}
