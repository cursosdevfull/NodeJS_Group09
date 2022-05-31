import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({ name: "medic" })
export class MedicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 5 })
  cmp: string;

  @Column({ type: "boolean", default: true })
  active: boolean;
}
