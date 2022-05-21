import { DriverModel } from "../domain/models/driver.model";
import { DriverRepository } from "../domain/repositories/driver.repository";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { DriverEntity } from "../domain/models/driver.entity";

export class DriverInfrastructure
  extends BaseInfrastructure<DriverModel>
  implements DriverRepository
{
  constructor() {
    super(DriverEntity);
  }

  reportByDriver(id: number): Promise<DriverModel[]> {
    throw new Error("Method not implemented.");
  }
}
