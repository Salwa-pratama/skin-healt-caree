import { prisma } from "../../../common/lib/prisma";

export class AdminRepository {
  async getStats() {
    const totalUsers = await prisma.userPublic.count();
    const totalScans = await prisma.acneProblem.count();
    const totalSolutions = await prisma.acneSolution.count({
      where: { userId: null as any }
    });
    const totalHabits = await prisma.habit.count();
    
    return {
      totalUsers,
      totalScans,
      totalSolutions,
      totalHabits
    };
  }

  async getAllUsers() {
    return prisma.userPublic.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        skintype: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async deleteUser(id: number) {
    // Delete related records manually because onDelete: Cascade is not set in schema.prisma
    return prisma.$transaction(async (tx) => {
      await tx.acneProblemSolution.deleteMany({ where: { userId: id } });
      await tx.acneProblem.deleteMany({ where: { userId: id } });
      
      // AcneSolutions owned by user
      const userSolutions = await tx.acneSolution.findMany({ where: { userId: id } });
      if (userSolutions.length > 0) {
        for (const sol of userSolutions) {
          await tx.goodIngredient.deleteMany({ where: { acneSolutions: { some: { id: sol.id } } } });
          await tx.badIngredient.deleteMany({ where: { acneSolutions: { some: { id: sol.id } } } });
          await tx.habit.deleteMany({ where: { acneSolutions: { some: { id: sol.id } } } });
          await tx.treatment.deleteMany({ where: { acneSolutions: { some: { id: sol.id } } } });
        }
        await tx.acneSolution.deleteMany({ where: { userId: id } });
      }

      // M-N relations implicitly will be deleted if we could, but Prisma handles implicit relation deletion automatically when the parent is deleted.
      // Wait, we need to delete user.
      return tx.userPublic.delete({ where: { id } });
    });
  }
}
