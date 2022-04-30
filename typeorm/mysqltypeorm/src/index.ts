import { createConnection, getRepository, Brackets, getManager } from "typeorm";
import { Car } from "./entity/Car";
import { Medic } from "./entity/Medic";

createConnection().then(async (connection) => {
  const medicRepository = getRepository(Medic);

  const medic = await medicRepository
    .createQueryBuilder() // select * from medic
    .update()
    .set({ name: "Usuario01" })
    .where("id = :id", { id: 9 })
    .execute();

  console.log(medic);

  /*   await medicRepository
    .createQueryBuilder()
    .delete()
    .where("age = :age", { age: 25 })
    .execute(); */

  const medicParameters = await medicRepository
    .createQueryBuilder("medic")
    .where("medic.id = :id")
    .setParameters({ id: 9 })
    .getOne();

  console.log("medicParameters", medicParameters);

  const medicRange = await medicRepository
    .createQueryBuilder("medic")
    .where("medic.age BETWEEN :age1 AND :age2", { age1: 20, age2: 30 })
    .getMany();

  console.log("medicRange", medicRange);

  const medicInAge = await medicRepository
    .createQueryBuilder("medic")
    .where("medic.age IN (:...ages)", { ages: [20, 30] })
    .getMany();

  console.log("medicInAge", medicInAge);

  const medicCondition = await medicRepository
    .createQueryBuilder("medic")
    .where("medic.age > :age", { age: 60 })
    //.andWhere("medic.id= :id", { id: 9 })
    .orWhere("medic.id= :id", { id: 9 })
    .getMany();

  console.log("medicCondition", medicCondition);

  const medicsInBrackets = await medicRepository
    .createQueryBuilder("medic")
    .where("medic.id >= :id", { id: 2 })
    .andWhere(
      new Brackets((qb) => {
        qb.where("medic.name = :name", { name: "Carlos" }).orWhere(
          "medic.age >= :age",
          { age: 40 }
        );
      })
    )
    .getSql();

  console.log("medicsInBrackets", medicsInBrackets);

  const medicSum = await medicRepository
    .createQueryBuilder("medic")
    .select(["SUM(medic.age) sumAge", "count(*) total"])
    .where("medic.id > :id", { id: 5 })
    .getRawOne();

  console.log("medicSum", medicSum);

  const medicHaving = await medicRepository
    .createQueryBuilder("medic")
    .having("medic.id > :id", { id: 5 })
    .getRawMany();

  console.log("medicHaving", medicHaving);

  const medicSorted = await medicRepository
    .createQueryBuilder("medic")
    .orderBy("medic.name", "DESC")
    .addOrderBy("medic.age", "ASC")
    .offset(1)
    .limit(2)
    .getMany();

  console.log("medicSorted", medicSorted);

  const entityManager = getManager();
  const listCars = await entityManager.query("select * from car");
  console.log("listCars", listCars);

  const oneCar = await entityManager.query("call listCarsNew(?)", [2]);
  console.log("oneCar", oneCar);
});
