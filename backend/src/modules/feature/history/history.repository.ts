import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class HistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveScanAsync(userId: number, data: { citra: string; name: string; predictions: any }) {
    return this.prisma.acneProblem.create({
      data: { ...data, userId },
    });
  }

  async getHistoryAsync(userId: number) {
    return this.prisma.acneProblem.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        acneProblemSolutions: {
          include: {
            acneSolution: {
              include: { goodIngredient: true, badIngredient: true, habits: true, treatments: true },
            },
          },
        },
      },
    });
  }

  async getHistoryByIdAsync(userId: number, id: number) {
    return this.prisma.acneProblem.findFirst({
      where: { id, userId },
      include: {
        acneProblemSolutions: {
          include: {
            acneSolution: {
              include: { goodIngredient: true, badIngredient: true, habits: true, treatments: true },
            },
          },
        },
      },
    });
  }

  async deletePivotRecords(id: number) {
    const pivots = await this.prisma.acneProblemSolution.findMany({
      where: { acneProblemId: id },
      select: { acneSolutionId: true },
    });
    const solutionIds = pivots.map((p) => p.acneSolutionId);
    await this.prisma.acneProblemSolution.deleteMany({
      where: { acneProblemId: id },
    });
    if (solutionIds.length > 0) {
      await this.prisma.acneSolution.deleteMany({
        where: { id: { in: solutionIds } },
      });
    }
  }

  async updateHistoryAsync(id: number, updateData: any) {
    return this.prisma.acneProblem.update({
      where: { id },
      data: updateData,
      include: {
        acneProblemSolutions: {
          include: {
            acneSolution: {
              include: { goodIngredient: true, badIngredient: true, habits: true, treatments: true },
            },
          },
        },
      },
    });
  }

  async deleteHistoryAsync(id: number) {
    const pivots = await this.prisma.acneProblemSolution.findMany({
      where: { acneProblemId: id },
      select: { acneSolutionId: true },
    });
    const solutionIds = pivots.map((p) => p.acneSolutionId);
    await this.prisma.acneProblemSolution.deleteMany({
      where: { acneProblemId: id },
    });
    if (solutionIds.length > 0) {
      await this.prisma.acneSolution.deleteMany({
        where: { id: { in: solutionIds } },
      });
    }
    return this.prisma.acneProblem.delete({ where: { id } });
  }
}
