import { DriverModel } from "../domain/models/driver.model";
import { DriverRepository } from "../domain/repositories/driver.repository";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { DriverEntity } from "../domain/models/driver.entity";
import Result from "../../shared/application/interfaces/result.interface";
import DatabaseBootstrap from "../..//bootstrap/database.bootstrap";
import { Repository } from "typeorm";
import { ResponseDto } from "../../shared/application/interfaces/dtos/response.dto";

export class DriverInfrastructure
  extends BaseInfrastructure<DriverModel>
  implements DriverRepository
{
  constructor() {
    super(DriverEntity, "DriverInfrastructure");
  }

  async getAll(where: object = {}): Promise<Result<DriverModel>> {
    const dataSource = DatabaseBootstrap.dataSource;
    const repository: Repository<DriverModel> =
      dataSource.getRepository(DriverEntity);

    const data: DriverModel[] = await repository.find({ where });

    return ResponseDto("", data);
  }

  reportByDriver(id: number): Promise<DriverModel[]> {
    throw new Error("Method not implemented.");
  }
}
