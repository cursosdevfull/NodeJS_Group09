export interface BaseRepository<T, U> {
  insert(entity: T): Promise<T>;
  update(entity: T, where: object, relations: string[]): Promise<T>;
  delete(where: object): Promise<T>;
  findOne(where: object, relations: string[]): Promise<T>;
  findAll(
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string }
  ): Promise<T[]>;
}
