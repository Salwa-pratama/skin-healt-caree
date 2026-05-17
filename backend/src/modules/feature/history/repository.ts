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
      orderBy: { createdAt: 'desc' },
      include: {
        acneProblemSolutions: {
          include: {
            acneSolution: {
              include: {
                goodIngredient: true,
                badIngredient: true,
                habits: true,
                treatments: true
              }
            }
          }
        }
      }
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
                treatments: true
              }
            }
          }
        }
      }
    });
  }

  async deletePivotRecords(id: number) {
    return prisma.acneProblemSolution.deleteMany({
      where: { acneProblemId: id }
    });
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
                treatments: true
              }
            }
          }
        }
      }
    });
  }

  async deleteHistoryAsync(id: number) {
    // Hapus data di tabel pivot (AcneProblemSolution) terlebih dahulu untuk menghindari Foreign Key Constraint Error
    await prisma.acneProblemSolution.deleteMany({
      where: { acneProblemId: id }
    });

    // Setelah pivot dihapus, baru aman untuk menghapus AcneProblem
    return prisma.acneProblem.delete({
      where: { id: id }
    });
  }
}
