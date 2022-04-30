import { createConnection, getRepository } from "typeorm";
import { Car } from "./entity/Car";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = getRepository(Medic);

  const medic = await medicRepository
    .createQueryBuilder() // select * from medic
    .select(["medic.id", "medic.name", "medic.lastname"])
    .from(Car, "car")
    .where("medic.id = :id", { id: 9 })
    .getOne();
  //.getSql();

  console.log(medic);
});
