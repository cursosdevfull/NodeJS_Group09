import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Car } from "./Car";

@Entity()
export class Medic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  cmp: string;

  @Column()
  age: number;

  //@OneToOne((type) => Car, (car) => car.medic, { cascade: true })
  //@OneToMany((type) => Car, (car) => car.medic, { cascade: true })
  @ManyToMany((type) => Car, (card) => card.medics, {
    cascade: true,
  })
  //cars: Promise<Car[]>;
  cars: Car[];
}
