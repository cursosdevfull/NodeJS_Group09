//import { RefreshTokenVO } from "../value-objects/refresh-token.vo";

export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public lastname: string,
    public email: string,
    public password: string,
    public refreshToken: string,
    public createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    public active: boolean
  ) {}
}
