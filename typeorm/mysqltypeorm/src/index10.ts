import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = connection.getRepository(Medic);

  const pageSize = 1;
  const pageNumber = 1;

  const medics = await medicRepository.findAndCount({
    relations: ["cars"],
    order: { age: "DESC" },
    skip: pageSize * pageNumber,
    take: pageSize,
  });

  console.log("medics", medics);
});
