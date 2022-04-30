import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = connection.getRepository(Medic);
  const carRepository = connection.getRepository(Car);

  const listMedics = await medicRepository.find({ relations: ["cars"] });
  console.log(JSON.stringify(listMedics, null, "\t"));
  const listCars = await carRepository.find({ relations: ["medics"] });
  console.log(JSON.stringify(listCars, null, "\t"));
});
