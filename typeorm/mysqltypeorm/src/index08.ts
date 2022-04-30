import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = connection.getRepository(Medic);
  const carRepository = connection.getRepository(Car);

  const medic = await medicRepository.find({
    where: { age: 25 },
    relations: ["cars"],
  });

  console.log("medic: " + JSON.stringify(medic, null, "\t"));
});
