import { HistoryModel } from "../domain/models/history.model";
import { HistoryRepository } from "../domain/repositories/history.repository";
import { BaseInfrastructure } from "../../shared/infrastructure/base-infrastructure";

export class HistoryInfrastructure extends BaseInfrastructure<HistoryModel, number> implements HistoryRepository {
  reportByHistory(id: number): Promise<HistoryModel[]> {
    throw new Error("Method not implemented.");
  }
}
