import { prisma } from "../../../common/lib/prisma";
import { HistoryResponse } from "./dto";

export class HistoryRepository {
  async saveScanAsync(
    userId: number,
    data: { citra: string; name: string; predictions: any },
  ) {
    return prisma.acneProblem.create({
      data: {
        ...data,
        userId: userId,
      },
    });
  }

  async getHistoryAsync(userId: number): Promise<HistoryResponse[]> {
    return prisma.acneProblem.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
      include: {
        acneProblemSolutions: {
          include: {
            acneSolution: {
              include: {
                goodIngredient: true,
                badIngredient: true,
                habits: true,
                treatments: true,
              },
            },
          },
        },
      },
    });
  }

  async getHistoryByIdAsync(userId: number, id: number) {
    return prisma.acneProblem.findFirst({
      where: { id: id, userId: userId },
      include: {
        acneProblemSolutions: {
          include: {
            acneSolution: {
              include: {
                goodIngredient: true,
                badIngredient: true,
                habits: true,
                treatments: true,
              },
            },
          },
        },
      },
    });
  }

  async deletePivotRecords(id: number) {
    // Ambil solutionIds dulu
    const pivots = await prisma.acneProblemSolution.findMany({
      where: { acneProblemId: id },
      select: { acneSolutionId: true },
    });
    const solutionIds = pivots.map((p) => p.acneSolutionId);

    // Hapus pivot
    await prisma.acneProblemSolution.deleteMany({
      where: { acneProblemId: id },
    });

    // Hapus AcneSolution lama juga
    if (solutionIds.length > 0) {
      await prisma.acneSolution.deleteMany({
        where: { id: { in: solutionIds } },
      });
    }
  }

  async updateHistoryAsync(id: number, updateData: any) {
    return prisma.acneProblem.update({
      where: { id: id },
      data: updateData,
      include: {
        acneProblemSolutions: {
          include: {
            acneSolution: {
              include: {
                goodIngredient: true,
                badIngredient: true,
                habits: true,
                treatments: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteHistoryAsync(id: number) {
    // 1. Ambil dulu acneSolutionId sebelum pivot dihapus
    const pivots = await prisma.acneProblemSolution.findMany({
      where: { acneProblemId: id },
      select: { acneSolutionId: true },
    });

    const solutionIds = pivots.map((p) => p.acneSolutionId);

    // 2. Menghapus pivot
    await prisma.acneProblemSolution.deleteMany({
      where: { acneProblemId: id },
    });

    // 3. Menghapus AcneSolution beserta relasinya (Ingredients, habits, treatments)
    if (solutionIds.length > 0) {
      // Menghapus many to many relation
      await prisma.acneSolution.deleteMany({
        where: { id: { in: solutionIds } },
      });
    }

    // 4. Baru hapus AcneProblem
    return prisma.acneProblem.delete({
      where: { id: id },
    });
    // Hapus data di tabel pivot (AcneProblemSolution) terlebih dahulu untuk menghindari Foreign Key Constraint Error
    await prisma.acneProblemSolution.deleteMany({
      where: { acneProblemId: id },
    });

    // Setelah pivot dihapus, baru aman untuk menghapus AcneProblem
    return prisma.acneProblem.delete({
      where: { id: id },
    });
  }
}
