import { DriverEntity } from "../../../drivers/domain/models/driver.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity({ name: "history" })
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  namePatient: string;

  @ManyToOne((type) => DriverEntity, (driver) => driver.histories)
  driver: DriverEntity;
}
