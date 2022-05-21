import { DriverModel } from "../domain/models/driver.model";
import { DriverRepository } from "../domain/repositories/driver.repository";
import { BaseApplication } from "../../shared/application/interfaces/base-application";
import { DriverDTO } from "./dtos/dto";

export class DriverApplication extends BaseApplication<DriverModel> {
  constructor(private repositoryDriver: DriverRepository) {
    super(repositoryDriver, new DriverDTO());
  }

  async getAll() {
    return await this.repositoryDriver.findAll({}, [], {});
  }

  async getReportByDriver(id: number) {
    return await this.repositoryDriver.reportByDriver(id);
  }
}
