import { SubscriptionRepository } from "./repository";
import { ServiceResponse, ServiceResponseSchema } from "../../../common/models/service_response";
import { StatusCodes } from "http-status-codes";
import { CreatePlanDTO, UpdatePlanDTO } from "./dto";

export class SubscriptionService {
  private repository: SubscriptionRepository;

  constructor() {
    this.repository = new SubscriptionRepository();
  }

  async getAllPlans(): Promise<ServiceResponseSchema<any>> {
    try {
      const plans = await this.repository.findAllPlans();
      return ServiceResponse.success("Berhasil mengambil semua paket", plans, StatusCodes.OK);
    } catch (error: any) {
      return ServiceResponse.failure(
        `Gagal mengambil paket: ${error.message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getPlanById(planId: number): Promise<ServiceResponseSchema<any>> {
    try {
      const plan = await this.repository.findPlanById(planId);
      if (!plan) {
        return ServiceResponse.failure("Paket tidak ditemukan", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success("Berhasil mengambil detail paket", plan, StatusCodes.OK);
    } catch (error: any) {
      return ServiceResponse.failure(
        `Gagal mengambil detail paket: ${error.message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createPlan(data: CreatePlanDTO): Promise<ServiceResponseSchema<any>> {
    try {
      const existing = await this.repository.findPlanByName(data.planName);
      if (existing) {
        return ServiceResponse.failure(
          `Nama paket '${data.planName}' sudah digunakan`,
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const model = data.model || `/api/predict/${data.planName.toLowerCase()}`;
      const plan = await this.repository.createPlan({
        ...data,
        model,
      });
      return ServiceResponse.success("Berhasil membuat paket baru", plan, StatusCodes.CREATED);
    } catch (error: any) {
      return ServiceResponse.failure(
        `Gagal membuat paket baru: ${error.message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updatePlan(planId: number, data: UpdatePlanDTO): Promise<ServiceResponseSchema<any>> {
    try {
      const plan = await this.repository.findPlanById(planId);
      if (!plan) {
        return ServiceResponse.failure("Paket tidak ditemukan", null, StatusCodes.NOT_FOUND);
      }

      if (data.planName && data.planName !== plan.planName) {
        const existing = await this.repository.findPlanByName(data.planName);
        if (existing) {
          return ServiceResponse.failure(
            `Nama paket '${data.planName}' sudah digunakan`,
            null,
            StatusCodes.BAD_REQUEST
          );
        }
      }

      const updatedPlan = await this.repository.updatePlan(planId, data);
      return ServiceResponse.success("Berhasil memperbarui paket", updatedPlan, StatusCodes.OK);
    } catch (error: any) {
      return ServiceResponse.failure(
        `Gagal memperbarui paket: ${error.message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deletePlan(planId: number): Promise<ServiceResponseSchema<any>> {
    try {
      const plan = await this.repository.findPlanById(planId);
      if (!plan) {
        return ServiceResponse.failure("Paket tidak ditemukan", null, StatusCodes.NOT_FOUND);
      }

      await this.repository.deletePlan(planId);
      return ServiceResponse.success("Berhasil menghapus paket", null, StatusCodes.OK);
    } catch (error: any) {
      return ServiceResponse.failure(
        `Gagal menghapus paket: ${error.message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getOrUpdateActiveSubscription(userId: number): Promise<any> {
    const now = new Date();
    let activeSub = await this.repository.findActiveSubscription(userId);

    // If no active subscription exists, create a default "pasien" subscription
    if (!activeSub) {
      const pasienPlan = await this.repository.findPlanByName("pasien");
      if (!pasienPlan) {
        throw new Error("Master plan 'pasien' tidak ditemukan di database.");
      }

      const dueDate = new Date();
      dueDate.setMonth(now.getMonth() + 1);

      activeSub = await this.repository.createSubscription({
        userId,
        planId: pasienPlan.id,
        status: "active",
        startDate: now,
        dueDate,
        currentMonthScans: 0,
      });
      return activeSub;
    }

    // Check Expiry
    if (activeSub.dueDate < now) {
      // Mark old subscription as expired
      await this.repository.updateSubscription(activeSub.id, { status: "expired" });

      // Find free "pasien" plan for demotion/rollover
      const pasienPlan = await this.repository.findPlanByName("pasien");
      if (!pasienPlan) {
        throw new Error("Master plan 'pasien' tidak ditemukan di database.");
      }

      const dueDate = new Date();
      dueDate.setMonth(now.getMonth() + 1);

      // Create new free subscription
      activeSub = await this.repository.createSubscription({
        userId,
        planId: pasienPlan.id,
        status: "active",
        startDate: now,
        dueDate,
        currentMonthScans: 0,
      });
    }

    return activeSub;
  }

  async getMySubscriptionResponse(userId: number): Promise<ServiceResponseSchema<any>> {
    try {
      const activeSub = await this.getOrUpdateActiveSubscription(userId);
      return ServiceResponse.success("Berhasil mengambil langganan aktif", activeSub, StatusCodes.OK);
    } catch (error: any) {
      return ServiceResponse.failure(
        `Gagal mengambil langganan aktif: ${error.message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async subscribeToPlan(userId: number, planId: number): Promise<ServiceResponseSchema<any>> {
    try {
      const plan = await this.repository.findPlanById(planId);
      if (!plan) {
        return ServiceResponse.failure("Paket tidak ditemukan", null, StatusCodes.NOT_FOUND);
      }

      // Deactivate all current active subscriptions for this user
      await this.repository.deactivateAllActiveSubscriptions(userId);

      const now = new Date();
      const dueDate = new Date();
      dueDate.setMonth(now.getMonth() + 1);

      const newSub = await this.repository.createSubscription({
        userId,
        planId: plan.id,
        status: "active",
        startDate: now,
        dueDate,
        currentMonthScans: 0,
      });

      return ServiceResponse.success("Berhasil melakukan aktivasi paket langganan", newSub, StatusCodes.CREATED);
    } catch (error: any) {
      return ServiceResponse.failure(
        `Gagal mengaktifkan paket: ${error.message}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // ================= LIMITS ENFORCEMENT =================

  async checkScanLimit(userId: number): Promise<any> {
    const activeSub = await this.getOrUpdateActiveSubscription(userId);
    const { maxScansPerMonth, currentMonthScans } = activeSub;

    if (maxScansPerMonth !== -1 && currentMonthScans >= maxScansPerMonth) {
      throw {
        status: StatusCodes.FORBIDDEN,
        message: `Batas upload scan bulanan Anda telah habis (${currentMonthScans}/${maxScansPerMonth}). Silakan upgrade paket Anda.`,
      };
    }
    return activeSub;
  }

  async incrementScanCount(userSubscriptionId: string, currentScans: number): Promise<void> {
    await this.repository.updateSubscription(userSubscriptionId, {
      currentMonthScans: currentScans + 1,
    });
  }

  async checkTodoLimit(userId: number): Promise<void> {
    const activeSub = await this.getOrUpdateActiveSubscription(userId);
    const { maxTodoCards } = activeSub.plan;

    if (maxTodoCards === -1) return;

    const currentCount = await this.repository.countUserTodoCards(userId);
    if (currentCount >= maxTodoCards) {
      throw {
        status: StatusCodes.FORBIDDEN,
        message: `Batas kartu to-do list Anda telah mencapai maksimum (${currentCount}/${maxTodoCards}). Silakan upgrade paket Anda untuk menambah lebih banyak kartu.`,
      };
    }
  }

  async checkHistoryLimit(userId: number): Promise<void> {
    const activeSub = await this.getOrUpdateActiveSubscription(userId);
    const { maxHistorySaved } = activeSub.plan;

    if (maxHistorySaved === -1) return;

    const currentCount = await this.repository.countUserHistory(userId);
    if (currentCount >= maxHistorySaved) {
      throw {
        status: StatusCodes.FORBIDDEN,
        message: `Batas penyimpanan riwayat Anda telah mencapai maksimum (${currentCount}/${maxHistorySaved}). Silakan upgrade paket Anda untuk menyimpan riwayat baru.`,
      };
    }
  }
}
