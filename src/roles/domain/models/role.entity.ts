import { UserEntity } from "../../../users/domain/models/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "role" })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  roleName: string;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @ManyToMany((type) => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
