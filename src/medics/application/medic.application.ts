import { BaseApplication } from "../../shared/application/interfaces/base-application";
import { MedicModel } from "../domain/models/medic.model";
import { MedicRepository } from "../domain/repositories/medic.repository";

export class MedicApplication extends BaseApplication<MedicModel> {
  constructor(private repositoryMedic: MedicRepository) {
    super(repositoryMedic);
  }

  async getReportByMedic(id: number) {
    return await this.repositoryMedic.reportByMedic(id);
  }
}
