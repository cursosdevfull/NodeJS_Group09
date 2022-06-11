import DatabaseBootstrap from "src/bootstrap/database.bootstrap";
import { Repository, In } from "typeorm";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { RoleEntity } from "../domain/models/role.entity";
import { RoleModel } from "../domain/models/role.model";
import { RoleRepository } from "../domain/repositories/role.repository";

export class RoleInfrastructure
  extends BaseInfrastructure<RoleModel>
  implements RoleRepository
{
  constructor() {
    super(RoleEntity, "RoleInfrastructure");
  }

  async findByIds(ids: number[]): Promise<RoleEntity[]> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<RoleEntity> =
      dataSource.getRepository(RoleEntity);

    return await repository.findBy({ id: In(ids) });
  }
}
