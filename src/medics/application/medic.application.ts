import { MedicModel } from "../domain/models/medic.model";
import { MedicRepository } from "../domain/repositories/medic.repository";

export class MedicApplication {
  constructor(private repositoryMedic: MedicRepository) {}

  async add(medic: MedicModel) {
    return await this.repositoryMedic.insert(medic);
  }

  async update(medic: MedicModel) {
    return await this.repositoryMedic.update(medic);
  }

  async delete(id: number) {
    return await this.repositoryMedic.delete(id);
  }

  async findById(id: number) {
    return await this.repositoryMedic.findById(id);
  }

  async findAll() {
    return await this.repositoryMedic.findAll();
  }

  async getReportByMedic(id: number) {
    return await this.repositoryMedic.reportByMedic(id);
  }
}
