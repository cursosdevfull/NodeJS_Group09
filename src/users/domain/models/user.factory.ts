import { PasswordService } from "../services/password.service";
import { TokensService } from "../services/tokens.service";
import { UserModel } from "./user.model";

export interface IUser {
  id: number;
  name: string;
  age: number;
  lastname: string;
  email: string;
  password: string;
  photo: string;
  roles: number[];
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  active: boolean;
}

export class UserFactory {
  create(user: Partial<IUser>) {
    const id = user.id || 0;
    const name = user.name;
    const age = user.age;
    const lastname = user.lastname;
    const email = user.email;
    const roles = user.roles;
    const photo = user.photo;
    const password = PasswordService.hashPassword(user.password);
    const refreshToken = TokensService.generateRefreshToken();
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = new Date();
    const active = user.active || true;

    if (name.trim() === "" || name.trim().length < 4) {
      throw new Error("Invalid name");
    }

    return new UserModel(
      id,
      name,
      age,
      lastname,
      email,
      password,
      refreshToken,
      photo,
      roles,
      createdAt,
      updatedAt,
      deletedAt,
      active
    );
  }
}
