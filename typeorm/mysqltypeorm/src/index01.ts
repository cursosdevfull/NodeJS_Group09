import { createConnection } from "typeorm";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medic = new Medic();

  medic.name = "Carlos";
  medic.lastname = "Reyes";
  medic.cmp = "56458";
  medic.age = 25;

  const medicRepository = connection.getRepository(Medic);
  //await medicRepository.save(medic);
  const listMedics = await medicRepository.find();
  console.log("medics", listMedics);

  const listOneMedic = await medicRepository.findOne();
  console.log("one medic", listOneMedic);

  const medic30 = await medicRepository.find({ age: 30 });
  console.log("medic30", medic30);

  const [records, count] = await medicRepository.findAndCount();
  console.log("records", records);
  console.log("count", count);
});
