import { RoleEntity } from "../../../roles/domain/models/role.entity";
export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public lastname: string,
    public email: string,
    public password: string,
    public refreshToken: string,
    public roles: number[] | string[] | RoleEntity[],
    public createdAt: Date,
    public updatedAt: Date | null,
    public deletedAt: Date | null,
    public active: boolean
  ) {}
}
