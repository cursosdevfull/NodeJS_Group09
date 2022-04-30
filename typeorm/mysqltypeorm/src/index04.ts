import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = connection.getRepository(Medic);
  const carRepository = connection.getRepository(Car);

  const medic = new Medic();
  medic.name = "Carlos";
  medic.lastname = "Reyes";
  medic.cmp = "56458";
  medic.age = 25;

  const medicNew = new Medic();
  medicNew.name = "Claudia";
  medicNew.lastname = "Reyes";
  medicNew.cmp = "25245";
  medicNew.age = 25;

  const car01 = new Car();
  car01.manufacturer = "Ford";
  car01.description = "Mustang";
  car01.color = "red";
  car01.year = 2020;
  car01.isSold = false;

  const car02 = new Car();
  car02.manufacturer = "Hyundai";
  car02.description = "Santa Fe";
  car02.color = "blue";
  car02.year = 2015;
  car02.isSold = true;

  medic.cars = [car01, car02];

  await medicRepository.save(medic);

  medicNew.cars = [car01];
  await medicRepository.save(medicNew);
});
