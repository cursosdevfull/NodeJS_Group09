import { HistoryEntity } from "src/histories/domain/models/history.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({ name: "driver" })
export class DriverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 50 })
  licenseDriver: string;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @OneToMany(type => HistoryEntity, history => history.driver)
  histories: HistoryEntity[];
}
