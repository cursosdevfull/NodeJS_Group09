import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = connection.getRepository(Medic);
  const carRepository = connection.getRepository(Car);

  const medic = await medicRepository.find({
    order: { age: "DESC" },
    relations: ["cars"],
  });

  console.log("medic: " + JSON.stringify(medic, null, "\t"));
});
