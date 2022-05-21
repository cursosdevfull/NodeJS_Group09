import { ObjectType, Repository } from "typeorm";
import DatabaseBootstrap from "../../bootstrap/database.bootstrap";
import * as _ from "lodash";

export abstract class BaseInfrastructure<T> {
  constructor(private entity: ObjectType<T>) {}

  async update(
    entity: Partial<T>,
    where: object,
    relations: string[] = []
  ): Promise<T> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);
    let recordToUpdate: any = await repository.findOne({
      where,
      relations,
    });

    recordToUpdate = _.merge(recordToUpdate, entity); // {id, name, lastname, age}    {name}
    await repository.save(recordToUpdate);

    return recordToUpdate;

    //recordToUpdate = Object.assign(recordToUpdate, entity); // {id, name, lastname, age}    {name}
  }

  async delete(where: object): Promise<T> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);
    let recordToDelete: any = await repository.findOne({
      where,
    });

    recordToDelete = _.merge(recordToDelete, { active: false });
    await repository.save(recordToDelete);

    return recordToDelete;
  }

  async findOne(where: object = {}, relations: string[] = []): Promise<T> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);
    const data: T = await repository.findOne({ where, relations });

    return data;
  }

  async findAll(
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<T[]> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);

    const _where = Object.assign(where, { active: true });

    const data: T[] = await repository.find({
      where: _where,
      relations,
      order,
    });

    return data;
  }

  async insert(entity: T): Promise<T> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<T> = dataSource.getRepository(this.entity);
    const instance = repository.create(entity);
    const data: T = await repository.save(instance);

    return data;
  }
}
