import { MedicModel } from "../domain/models/medic.model";
import { MedicRepository } from "../domain/repositories/medic.repository";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";

export class MedicInfrastructure extends BaseInfrastructure<MedicModel, number> implements MedicRepository {
  reportByMedic(id: number): Promise<MedicModel[]> {
    throw new Error("Method not implemented.");
  }
}
