"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRepository = void 0;
const prisma_1 = require("../../../common/lib/prisma");
class HistoryRepository {
    async saveScanAsync(userId, data) {
        return prisma_1.prisma.acneProblem.create({
            data: {
                ...data,
                userId: userId,
            },
        });
    }
    async getHistoryAsync(userId) {
        return prisma_1.prisma.acneProblem.findMany({
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
    async getHistoryByIdAsync(userId, id) {
        return prisma_1.prisma.acneProblem.findFirst({
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
    async deletePivotRecords(id) {
        // Ambil solutionIds dulu
        const pivots = await prisma_1.prisma.acneProblemSolution.findMany({
            where: { acneProblemId: id },
            select: { acneSolutionId: true },
        });
        const solutionIds = pivots.map((p) => p.acneSolutionId);
        // Hapus pivot
        await prisma_1.prisma.acneProblemSolution.deleteMany({
            where: { acneProblemId: id },
        });
        // Hapus AcneSolution lama juga
        if (solutionIds.length > 0) {
            await prisma_1.prisma.acneSolution.deleteMany({
                where: { id: { in: solutionIds } },
            });
        }
    }
    async updateHistoryAsync(id, updateData) {
        return prisma_1.prisma.acneProblem.update({
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
    async deleteHistoryAsync(id) {
        // 1. Ambil dulu acneSolutionId sebelum pivot dihapus
        const pivots = await prisma_1.prisma.acneProblemSolution.findMany({
            where: { acneProblemId: id },
            select: { acneSolutionId: true },
        });
        const solutionIds = pivots.map((p) => p.acneSolutionId);
        // 2. Menghapus pivot
        await prisma_1.prisma.acneProblemSolution.deleteMany({
            where: { acneProblemId: id },
        });
        // 3. Menghapus AcneSolution beserta relasinya (Ingredients, habits, treatments)
        if (solutionIds.length > 0) {
            // Menghapus many to many relation
            await prisma_1.prisma.acneSolution.deleteMany({
                where: { id: { in: solutionIds } },
            });
        }
        // 4. Baru hapus AcneProblem
        return prisma_1.prisma.acneProblem.delete({
            where: { id: id },
        });
        // Hapus data di tabel pivot (AcneProblemSolution) terlebih dahulu untuk menghindari Foreign Key Constraint Error
        await prisma_1.prisma.acneProblemSolution.deleteMany({
            where: { acneProblemId: id },
        });
        // Setelah pivot dihapus, baru aman untuk menghapus AcneProblem
        return prisma_1.prisma.acneProblem.delete({
            where: { id: id },
        });
    }
}
exports.HistoryRepository = HistoryRepository;
