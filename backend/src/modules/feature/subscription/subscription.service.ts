import { Injectable, BadRequestException, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { CreatePlanDto, UpdatePlanDto } from './dto/subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly repository: SubscriptionRepository) {}

  async getAllPlans() {
    return this.repository.findAllPlans();
  }

  async getPlanById(planId: number) {
    const plan = await this.repository.findPlanById(planId);
    if (!plan) throw new NotFoundException("Paket tidak ditemukan");
    return plan;
  }

  async createPlan(data: CreatePlanDto) {
    const existing = await this.repository.findPlanByName((data as any).planName);
    if (existing) throw new BadRequestException(`Nama paket '${(data as any).planName}' sudah digunakan`);
    const model = (data as any).model || `/api/predict/${(data as any).planName.toLowerCase()}`;
    return this.repository.createPlan({ ...data, model });
  }

  async updatePlan(planId: number, data: UpdatePlanDto) {
    const plan = await this.repository.findPlanById(planId);
    if (!plan) throw new NotFoundException("Paket tidak ditemukan");
    if ((data as any).planName && (data as any).planName !== (plan as any).planName) {
      const existing = await this.repository.findPlanByName((data as any).planName);
      if (existing) throw new BadRequestException(`Nama paket '${(data as any).planName}' sudah digunakan`);
    }
    return this.repository.updatePlan(planId, data);
  }

  async deletePlan(planId: number) {
    const plan = await this.repository.findPlanById(planId);
    if (!plan) throw new NotFoundException("Paket tidak ditemukan");
    await this.repository.deletePlan(planId);
    return { success: true };
  }

  async getAllUserSubscriptions() {
    return this.repository.findAllUserSubscriptions();
  }

  async updateUserSubscription(id: number, data: any) {
    let updateData = { ...data };
    if (data.planName) {
      const plan = await this.repository.findPlanByName(data.planName.toLowerCase());
      if (plan) {
        updateData.planId = plan.id;
      }
      delete updateData.planName;
    }
    return this.repository.updateSubscription(id, updateData);
  }

  async deleteUserSubscription(id: number) {
    return this.repository.deleteUserSubscription(id);
  }

  async getOrUpdateActiveSubscription(userId: number) {
    const now = new Date();
    let activeSub = await this.repository.findActiveSubscription(userId);
    if (!activeSub) {
      const pasienPlan = await this.repository.findPlanByName("pasien");
      if (!pasienPlan) throw new InternalServerErrorException("Master plan 'pasien' tidak ditemukan di database.");
      const dueDate = new Date();
      dueDate.setMonth(now.getMonth() + 1);
      return this.repository.createSubscription({
        userId, planId: pasienPlan.id, status: "active", startDate: now, dueDate, currentMonthScans: 0,
      });
    }
    if (activeSub.dueDate < now) {
      await this.repository.updateSubscription(activeSub.id, { status: "expired" });
      const pasienPlan = await this.repository.findPlanByName("pasien");
      if (!pasienPlan) throw new InternalServerErrorException("Master plan 'pasien' tidak ditemukan di database.");
      const dueDate = new Date();
      dueDate.setMonth(now.getMonth() + 1);
      return this.repository.createSubscription({
        userId, planId: pasienPlan.id, status: "active", startDate: now, dueDate, currentMonthScans: 0,
      });
    }
    return activeSub;
  }

  async getMySubscription(userId: number) {
    return this.getOrUpdateActiveSubscription(userId);
  }

  async subscribeToPlan(userId: number, planId: number) {
    const plan = await this.repository.findPlanById(planId);
    if (!plan) throw new NotFoundException("Paket tidak ditemukan");
    await this.repository.deactivateAllActiveSubscriptions(userId);
    const now = new Date();
    const dueDate = new Date();
    dueDate.setMonth(now.getMonth() + 1);
    return this.repository.createSubscription({
      userId, planId: plan.id, status: "active", startDate: now, dueDate, currentMonthScans: 0,
    });
  }

  async checkScanLimit(userId: number) {
    const activeSub = await this.getOrUpdateActiveSubscription(userId);
    const { maxScansPerMonth } = activeSub.plan;
    const currentMonthScans = activeSub.currentMonthScans;
    if (maxScansPerMonth !== -1 && currentMonthScans >= maxScansPerMonth) {
      throw new ForbiddenException(`Batas upload scan bulanan Anda telah habis (${currentMonthScans}/${maxScansPerMonth}). Silakan upgrade paket Anda.`);
    }
    return activeSub;
  }

  async incrementScanCount(userSubscriptionId: number, currentScans: number) {
    await this.repository.updateSubscription(userSubscriptionId, { currentMonthScans: currentScans + 1 });
  }

  async checkTodoLimit(userId: number) {
    const activeSub = await this.getOrUpdateActiveSubscription(userId);
    const { maxTodoCards } = activeSub.plan;
    if (maxTodoCards === -1) return;
    const currentCount = await this.repository.countUserTodoCards(userId);
    if (currentCount >= maxTodoCards) {
      throw new ForbiddenException(`Batas kartu to-do list Anda telah mencapai maksimum (${currentCount}/${maxTodoCards}). Silakan upgrade paket.`);
    }
  }

  async checkHistoryLimit(userId: number) {
    const activeSub = await this.getOrUpdateActiveSubscription(userId);
    const { maxHistorySaved } = activeSub.plan;
    if (maxHistorySaved === -1) return;
    const currentCount = await this.repository.countUserHistory(userId);
    if (currentCount >= maxHistorySaved) {
      throw new ForbiddenException(`Batas penyimpanan riwayat Anda telah mencapai maksimum (${currentCount}/${maxHistorySaved}). Silakan upgrade paket.`);
    }
  }
}
