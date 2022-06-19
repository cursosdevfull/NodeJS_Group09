import { UserModel } from "../../domain/models/user.model";
import Result from "../../../shared/application/interfaces/result.interface";
import { DTOAbstract } from "../../../shared/application/interfaces/dtos/abstract.dto";
import yenv from "yenv";

const env = yenv();

export class UserDTO extends DTOAbstract<UserModel> {
  callback(result: Result<UserModel>): Result<UserModel> {
    const data = result.payload.data;

    if (Array.isArray(data)) {
      result.payload.data = data.map((user: UserModel) => {
        if (user.roles) {
          user.roles = user.roles.map((role: any) => role.roleName);
        }

        user.photo = `${env.S3.bucketPath}/${user.photo}`;

        delete user.password;
        delete user.active;
        delete user.refreshToken;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.deletedAt;

        return user;
      });
    } else {
      const userModel = result.payload.data as UserModel;
      if (userModel.roles) {
        userModel.roles = userModel.roles.map((role: any) => role.roleName);
      }

      userModel.photo = `${env.S3.bucketPath}/${userModel.photo}`;

      delete (result.payload.data as UserModel).active;
      delete (result.payload.data as UserModel).password;
      delete (result.payload.data as UserModel).refreshToken;
      delete (result.payload.data as UserModel).createdAt;
      delete (result.payload.data as UserModel).updatedAt;
      delete (result.payload.data as UserModel).deletedAt;
    }

    return result;
  }
}
