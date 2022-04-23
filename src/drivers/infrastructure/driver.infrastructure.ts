import { DriverModel } from "../domain/models/driver.model";
import { DriverRepository } from "../domain/repositories/driver.repository";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";

export class DriverInfrastructure extends BaseInfrastructure<DriverModel, number> implements DriverRepository {
  reportByDriver(id: number): Promise<DriverModel[]> {
    throw new Error("Method not implemented.");
  }
}
