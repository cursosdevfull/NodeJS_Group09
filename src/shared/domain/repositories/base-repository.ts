export interface BaseRepository<T, U> {
  insert(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: U): Promise<T>;
  findById(id: U): Promise<T>;
  findAll(
    where: { [s: string]: string | number | boolean },
    order: { [s: string]: string }
  ): Promise<T[]>;
}
