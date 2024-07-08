export interface IMapperService<S, T> {
  transform(entity: S): T;
  transform(array: S[]): T[];
  transform(entityOrArray: S | S[]): T | T[];
}

export interface Item<T = any> {
  [key: string]: T;
}

export interface ItemGroup<T> {
  [key: string]: T[];
}

export abstract class MapperService<S, T> implements IMapperService<S, T> {
  protected abstract map(entity: S): T;

  transform(entity: S): T;
  transform(array: S[]): T[];
  transform(entityOrArray: S | S[]): T | T[] {
    return Array.isArray(entityOrArray)
      ? entityOrArray.map((item: S) => this.map(item))
      : this.map(entityOrArray);
  }
  mapByKey<T extends Item>({
    array,
    key,
  }: {
    array: T[];
    key: keyof T;
  }): Item<T> {
    return array.reduce((map, item) => ({ ...map, [item[key]]: item }), {});
  }

  groupByKey<T extends Item>(array: T[], key: keyof T): ItemGroup<T> {
    return array.reduce<ItemGroup<T>>((map, item) => {
      const itemKey = item[key];
      if (map[itemKey]) {
        map[itemKey].push(item);
      } else {
        map[itemKey] = [item];
      }
      return map;
    }, {});
  }

  mergeByKey<T extends Item, K extends Item>(a: T, b: K): T & K {
    return { ...a, ...b };
  }

  shallow<T extends object>(source: T): T {
    return {
      ...source,
    };
  }
}
