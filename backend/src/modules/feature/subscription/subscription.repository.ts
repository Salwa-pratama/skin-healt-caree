import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePlanDto, UpdatePlanDto } from './dto/subscription.dto';

@Injectable()
export class SubscriptionRepository {
  constructor(private prisma: PrismaService) {}

  async findAllPlans() {
    return this.prisma.subscription.findMany({ orderBy: { price: "asc" } });
  }

  async findPlanById(planId: number) {
    return this.prisma.subscription.findUnique({ where: { id: planId } });
  }

  async findPlanByName(planName: string) {
    return this.prisma.subscription.findUnique({ where: { planName } });
  }

  async createPlan(data: CreatePlanDto & { model: string }) {
    return this.prisma.subscription.create({ data });
  }

  async updatePlan(planId: number, data: UpdatePlanDto) {
    return this.prisma.subscription.update({ where: { id: planId }, data });
  }

  async deletePlan(planId: number) {
    return this.prisma.subscription.delete({ where: { id: planId } });
  }

  async findActiveSubscription(userId: number) {
    return this.prisma.userSubscription.findFirst({
      where: { userId, status: "active" },
      include: { plan: true },
      orderBy: { id: "desc" },
    });
  }

  async deactivateAllActiveSubscriptions(userId: number) {
    return this.prisma.userSubscription.updateMany({
      where: { userId, status: "active" },
      data: { status: "expired" },
    });
  }

  async createSubscription(data: any) {
    return this.prisma.userSubscription.create({ data, include: { plan: true } });
  }

  async updateSubscription(id: number, data: any) {
    return this.prisma.userSubscription.update({ where: { id }, data, include: { plan: true } });
  }

  async countUserTodoCards(userId: number) {
    const treatmentsCount = await this.prisma.jadwalTreatment.count({
      where: { users: { some: { id: userId } } },
    });
    const habitsCount = await this.prisma.jadwalHabit.count({
      where: { users: { some: { id: userId } } },
    });
    return treatmentsCount + habitsCount;
  }

  async countUserHistory(userId: number) {
    return this.prisma.acneProblem.count({ where: { userId } });
  }
}
