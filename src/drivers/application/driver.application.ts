import { DriverModel } from "../domain/models/driver.model";
import { DriverRepository } from "../domain/repositories/driver.repository";

export class DriverApplication {
  constructor(private repositoryDriver: DriverRepository) {}

  async add(driver: DriverModel) {
    return await this.repositoryDriver.insert(driver);
  }

  async update(driver: DriverModel) {
    return await this.repositoryDriver.update(driver);
  }

  async delete(id: number) {
    return await this.repositoryDriver.delete(id);
  }

  async findById(id: number) {
    return await this.repositoryDriver.findById(id);
  }

  async findAll() {
    return await this.repositoryDriver.findAll();
  }

  async getReportByDriver(id: number) {
    return await this.repositoryDriver.reportByDriver(id);
  }
}
