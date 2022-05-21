import { MedicModel } from "../domain/models/medic.model";
import { MedicRepository } from "../domain/repositories/medic.repository";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";
import { MedicEntity } from "../domain/models/medic.entity";
export class MedicInfrastructure
  extends BaseInfrastructure<MedicModel>
  implements MedicRepository
{
  constructor() {
    super(MedicEntity);
  }

  reportByMedic(id: number): Promise<MedicModel[]> {
    throw new Error("Method not implemented.");
  }
}
