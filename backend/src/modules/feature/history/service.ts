import { HistoryRepository } from "./repository";

export class HistoryService {
  constructor(private readonly repository: HistoryRepository = new HistoryRepository()) {}

  async saveScanAsync(userId: number, data: { citra: string; name: string; predictions: any }) {
    return this.repository.saveScanAsync(userId, data);
  }

  async getHistoryAsync(userId: number) {
    return this.repository.getHistoryAsync(userId);
  }

  async deleteHistoryAsync(id: number) {
    return this.repository.deleteHistoryAsync(id);
  }
}
