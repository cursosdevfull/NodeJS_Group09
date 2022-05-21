import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { UserEntity } from "../domain/models/user.entity";
import { UserModel } from "../domain/models/user.model";
import { UserRepository } from "../domain/repositories/user.repository";

export class UserInfrastructure
  extends BaseInfrastructure<UserModel>
  implements UserRepository
{
  constructor() {
    super(UserEntity);
  }
}
