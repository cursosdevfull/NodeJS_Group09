import { DTOAbstract } from "src/drivers/application/dtos/dto";
import { BaseRepository } from "src/shared/domain/repositories/base-repository";
import Result from "./result.interface";

export class BaseApplication<T> {
  constructor(
    private repository: BaseRepository<T, number>,
    private dto: DTOAbstract<T> = null
  ) {}

  async add(entity: T): Promise<Result<T>> {
    return await this.repository.insert(entity);
  }

  async update(
    entity: T,
    where: object,
    relations: string[]
  ): Promise<Result<T>> {
    return await this.repository.update(entity, where, relations);
  }

  async delete(where: object): Promise<Result<T>> {
    const result = await this.repository.delete(where);
    return this.dto.mapping(result);
  }

  async findOne(where: object, relations: string[]): Promise<Result<T>> {
    const result = await this.repository.findOne(where, relations);
    return this.dto.mapping(result);
  }

  async findAll(
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string }
  ): Promise<Result<T>> {
    const result = await this.repository.findAll(where, relations, order);
    return this.dto.mapping(result);
  }

  async getPage(
    page: number,
    pageSize: number,
    where: { [s: string]: string | number | boolean },
    relations: string[],
    order: { [s: string]: string }
  ): Promise<Result<T>> {
    return await this.repository.getPage(
      page,
      pageSize,
      where,
      relations,
      order
    );
  }
}
