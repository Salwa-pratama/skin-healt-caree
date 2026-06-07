import { prisma } from "../../../common/lib/prisma";
import { CreatePlanDTO, UpdatePlanDTO } from "./dto";

export class SubscriptionRepository {
  async findAllPlans() {
    return await prisma.subscription.findMany({
      orderBy: { price: "asc" },
    });
  }

  async findPlanById(planId: number) {
    return await prisma.subscription.findUnique({
      where: { id: planId },
    });
  }

  async findPlanByName(planName: string) {
    return await prisma.subscription.findUnique({
      where: { planName },
    });
  }

  async createPlan(data: CreatePlanDTO & { model: string }) {
    return await prisma.subscription.create({
      data,
    });
  }

  async updatePlan(planId: number, data: UpdatePlanDTO) {
    return await prisma.subscription.update({
      where: { id: planId },
      data,
    });
  }

  async deletePlan(planId: number) {
    return await prisma.subscription.delete({
      where: { id: planId },
    });
  }

  async findActiveSubscription(userId: number) {
    return await prisma.userSubscription.findFirst({
      where: {
        userId,
        status: "active",
      },
      include: {
        plan: true,
      },
      orderBy: {
        id: "desc", // Get the latest active in case of duplicates
      },
    });
  }

  async deactivateAllActiveSubscriptions(userId: number) {
    return await prisma.userSubscription.updateMany({
      where: {
        userId,
        status: "active",
      },
      data: {
        status: "expired",
      },
    });
  }

  async createSubscription(data: {
    userId: number;
    planId: number;
    status: string;
    startDate: Date;
    dueDate: Date;
    currentMonthScans: number;
  }) {
    return await prisma.userSubscription.create({
      data,
      include: {
        plan: true,
      },
    });
  }

  async updateSubscription(
    id: string,
    data: {
      status?: string;
      startDate?: Date;
      dueDate?: Date;
      currentMonthScans?: number;
      planId?: number;
    }
  ) {
    return await prisma.userSubscription.update({
      where: { id },
      data,
      include: {
        plan: true,
      },
    });
  }

  async countUserTodoCards(userId: number) {
    const treatmentsCount = await prisma.jadwalTreatment.count({
      where: {
        users: {
          some: { id: userId },
        },
      },
    });

    const habitsCount = await prisma.jadwalHabit.count({
      where: {
        users: {
          some: { id: userId },
        },
      },
    });

    return treatmentsCount + habitsCount;
  }

  async countUserHistory(userId: number) {
    return await prisma.acneProblem.count({
      where: { userId },
    });
  }
}
