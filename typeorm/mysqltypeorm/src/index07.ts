import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = connection.getRepository(Medic);
  const carRepository = connection.getRepository(Car);

  const medic = await medicRepository.findOne();
  const carsMedic = await medic.cars;

  console.log("Cars of medic: " + JSON.stringify(carsMedic, null, "\t"));
});
