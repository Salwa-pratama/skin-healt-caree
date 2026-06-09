import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const totalUsers = await this.prisma.userPublic.count();
    const totalScans = await this.prisma.acneProblem.count();
    const totalSolutions = await this.prisma.acneSolution.count({
      where: { userId: null }
    });
    const totalHabits = await this.prisma.habit.count();
    
    return { totalUsers, totalScans, totalSolutions, totalHabits };
  }

  async getAllUsers() {
    return this.prisma.userPublic.findMany({
      select: {
        id: true, email: true, name: true, role: true, phone: true, skintype: true, createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async deleteUser(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.acneProblemSolution.deleteMany({ where: { userId: id } });
      await tx.acneProblem.deleteMany({ where: { userId: id } });
      
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
      return tx.userPublic.delete({ where: { id } });
    });
  }
}
