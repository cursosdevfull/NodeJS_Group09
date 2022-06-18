import { RoleRepository } from "../../roles/domain/repositories/role.repository";
import Result from "../../shared/application/interfaces/result.interface";
import { BaseApplication } from "../../shared/application/interfaces/base-application";
import { UserEntity } from "../domain/models/user.entity";
import { UserModel } from "../domain/models/user.model";
import { UserRepository } from "../domain/repositories/user.repository";
import { UserDTO } from "./dtos/dto";

export class UserApplication extends BaseApplication<UserModel> {
  constructor(
    private repositoryUser: UserRepository,
    private repositoryModel: RoleRepository
  ) {
    super(repositoryUser, new UserDTO(), "UserApplication");
  }

  override async add(entity: UserModel): Promise<Result<UserModel>> {
    if (entity.roles.length > 0) {
      const roles = await this.repositoryModel.findByIds(
        entity.roles as number[]
      );
      entity.roles = roles;
    } else {
      delete entity.roles;
    }

    const result = await this.repositoryUser.insert(entity);
    return new UserDTO().mapping(result);
  }
}
