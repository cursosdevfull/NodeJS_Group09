import { RefreshTokenVO } from "../value-objects/refresh-token.vo";
import { UserModel } from "./user.model";

export class UserFactory {
  create(
    id: number,
    name: string,
    age: number,
    lastname: string,
    password: string,
    refreshToken: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  ) {
    if (updatedAt < createdAt || deletedAt < createdAt) {
      throw new Error("Invalid date");
    }

    if (name.trim() === "" || name.trim().length < 4) {
      throw new Error("Invalid name");
    }

    //return new UserModel(id, name, age, lastname, password, RefreshTokenVO.create(refreshToken), createdAt, updatedAt, deletedAt);
  }
}

/* const userFactory = new UserFactory();
const userModel = userFactory.create(1, "John", 20, "Doe", "12345", "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", new Date(), new Date(), new Date());
userModel.refreshToken.returnValue; */
