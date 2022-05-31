import { BaseApplication } from "../../shared/application/interfaces/base-application";
import { HistoryModel } from "../domain/models/history.model";
import { HistoryRepository } from "../domain/repositories/history.repository";

export class HistoryApplication extends BaseApplication<HistoryModel> {
  constructor(private repositoryHistory: HistoryRepository) {
    super(repositoryHistory);
  }

  async getReportByHistory(id: number) {
    return await this.repositoryHistory.reportByHistory(id);
  }
}
