import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { UserModel } from "../domain/models/user.model";
import { UserRepository } from "../domain/repositories/user.repository";

export class UserInfrastructure extends BaseInfrastructure<UserModel, string> implements UserRepository {
  callProcedure(input: any): Promise<any> {
    return Promise.resolve(true);
  }
}
