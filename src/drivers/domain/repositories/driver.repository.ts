import Result from "src/shared/application/interfaces/result.interface";
import { BaseRepository } from "../../../shared/domain/repositories/base-repository";
import { DriverModel } from "../models/driver.model";

export interface DriverRepository extends BaseRepository<DriverModel, number> {
  getAll(where: object): Promise<Result<DriverModel>>;
  reportByDriver(id: number): Promise<DriverModel[]>;
}
