import { createConnection, getRepository } from "typeorm";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = getRepository(Medic);

  const medic = await medicRepository
    .createQueryBuilder("medico") // select * from medic
    .where("medico.id = :id", { id: 9 })
    //.getOne();
    .getSql();

  console.log(medic);
});
