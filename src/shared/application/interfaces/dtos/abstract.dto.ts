import Result from "../result.interface";

export abstract class DTOAbstract<T> {
  abstract callback(result: Result<T>): Result<T>;

  mapping(result: Result<T>): Result<T> {
    return this.callback(result);
  }
}
