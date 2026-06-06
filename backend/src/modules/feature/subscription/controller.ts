import { Request, Response } from "express";
import { SubscriptionService } from "./service";
import { subscribePlanSchema, createSubscriptionSchema, updateSubscriptionSchema } from "./dto";
import { StatusCodes } from "http-status-codes";

export class SubscriptionController {
  private service: SubscriptionService;

  constructor() {
    this.service = new SubscriptionService();
  }

  getPlans = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.getAllPlans();
    res.status(result.statusCode).json(result);
  };

  getPlanById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const planId = Number(id);
      if (isNaN(planId)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "ID paket harus berupa angka",
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        });
        return;
      }
      const result = await this.service.getPlanById(planId);
      res.status(result.statusCode).json(result);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil detail paket",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  createPlan = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = createSubscriptionSchema.safeParse(req.body);
      if (!parsed.success) {
        const errorMsg = parsed.error.issues.map((e: any) => e.message).join(", ");
        res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: errorMsg,
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        });
        return;
      }

      const result = await this.service.createPlan(parsed.data);
      res.status(result.statusCode).json(result);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal membuat paket",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  updatePlan = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const planId = Number(id);
      if (isNaN(planId)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "ID paket harus berupa angka",
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        });
        return;
      }
      const parsed = updateSubscriptionSchema.safeParse(req.body);
      if (!parsed.success) {
        const errorMsg = parsed.error.issues.map((e: any) => e.message).join(", ");
        res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: errorMsg,
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        });
        return;
      }

      const result = await this.service.updatePlan(planId, parsed.data);
      res.status(result.statusCode).json(result);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal memperbarui paket",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  deletePlan = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const planId = Number(id);
      if (isNaN(planId)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "ID paket harus berupa angka",
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        });
        return;
      }
      const result = await this.service.deletePlan(planId);
      res.status(result.statusCode).json(result);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal menghapus paket",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  getMySubscription = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.userId || (req as any).user?.id;
      if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized - User tidak ditemukan dalam token",
          statusCode: StatusCodes.UNAUTHORIZED,
          data: null,
        });
        return;
      }

      const result = await this.service.getMySubscriptionResponse(Number(userId));
      res.status(result.statusCode).json(result);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil langganan aktif",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };

  subscribe = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.userId || (req as any).user?.id;
      if (!userId) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
          statusCode: StatusCodes.UNAUTHORIZED,
          data: null,
        });
        return;
      }

      // Parse payload using Zod
      const parsed = subscribePlanSchema.safeParse(req.body);
      if (!parsed.success) {
        const errorMsg = parsed.error.issues.map((e: any) => e.message).join(", ");
        res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: errorMsg,
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        });
        return;
      }

      const planId = parsed.data.planId ?? parsed.data.plan_id;
      if (planId === undefined) {
        res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "Either planId or plan_id must be provided",
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        });
        return;
      }

      const result = await this.service.subscribeToPlan(Number(userId), planId);
      res.status(result.statusCode).json(result);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengaktifkan paket langganan",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  };
}
