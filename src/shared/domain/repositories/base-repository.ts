import Result from "../../../shared/application/interfaces/result.interface";

export interface BaseRepository<T, U> {
  insert(entity: T): Promise<Result<T>>;
  update(entity: T, where: object, relations: string[]): Promise<Result<T>>;
  delete(where: object): Promise<Result<T>>;
  findOne(where: object, relations: string[]): Promise<Result<T>>;
  findAll(
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string }
  ): Promise<Result<T>>;
  getPage(
    page: number,
    pageSize: number,
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string }
  ): Promise<Result<T>>;
}
