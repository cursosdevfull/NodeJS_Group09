import { HistoryModel } from "../domain/models/history.model";
import { HistoryRepository } from "../domain/repositories/history.repository";

export class HistoryApplication {
  constructor(private repositoryHistory: HistoryRepository) {}

  async add(history: HistoryModel) {
    return await this.repositoryHistory.insert(history);
  }

  async update(history: HistoryModel) {
    return await this.repositoryHistory.update(history);
  }

  async delete(id: number) {
    return await this.repositoryHistory.delete(id);
  }

  async findById(id: number) {
    return await this.repositoryHistory.findById(id);
  }

  async findAll() {
    return await this.repositoryHistory.findAll();
  }

  async getReportByHistory(id: number) {
    return await this.repositoryHistory.reportByHistory(id);
  }
}
