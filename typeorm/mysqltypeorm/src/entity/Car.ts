import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Medic } from "./Medic";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  manufacturer: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar", length: 20 })
  color: string;

  @Column({
    type: "int",
  })
  year: number;

  @Column({ type: "bool" })
  isSold: boolean;

  /*   @OneToOne((type) => Medic, (medic) => medic.car)
  @JoinColumn() */
  //@ManyToOne((type) => Medic, (medic) => medic.cars)
  @ManyToMany((type) => Medic, (medic) => medic.cars)
  @JoinTable()
  //medics: Promise<Medic[]>;
  medics: Medic[];
}
