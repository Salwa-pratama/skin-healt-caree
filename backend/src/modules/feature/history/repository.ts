import { prisma } from "../../../common/lib/prisma";
import { HistoryResponse } from "./dto";

export class HistoryRepository {
  async saveScanAsync(userId: number, data: { citra: string; name: string; predictions: any }) {
    return prisma.acneProblem.create({
      data: {
        ...data,
        userId: userId
      }
    });
  }

  async getHistoryAsync(userId: number): Promise<HistoryResponse[]> {
    return prisma.acneProblem.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async deleteHistoryAsync(id: number) {
    return prisma.acneProblem.delete({
      where: { id: id }
    });
  }
}
