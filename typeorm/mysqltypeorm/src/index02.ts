import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = connection.getRepository(Medic);
  //const carRepository = connection.getRepository(Car);

  const medic = new Medic();
  const car = new Car();

  medic.name = "Carlos";
  medic.lastname = "Reyes";
  medic.cmp = "56458";
  medic.age = 25;

  car.manufacturer = "Ford";
  car.description = "Mustang";
  car.color = "red";
  car.year = 2020;
  car.isSold = false;

  medic.car = car;

  await medicRepository.save(medic);
});
