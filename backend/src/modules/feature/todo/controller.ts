import { Request, Response } from "express";
import { TodoService } from "./service";
import {
  createTreatmentSchema,
  updateTreatmentSchema,
  createHabitSchema,
  updateHabitSchema,
} from "./dto";
import { StatusCodes } from "http-status-codes";

export class TodoController {
  private service: TodoService;

  constructor() {
    this.service = new TodoService();
  }

  // ================= JADWAL TREATMENT =================

  getTreatments = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized - User tidak ditemukan dalam token",
        });
      }

      const treatments = await this.service.getTreatments(Number(userId));
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil mengambil daftar jadwal treatment",
        data: treatments,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil daftar jadwal treatment",
      });
    }
  };

  getTreatmentById = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      const { id } = req.params;

      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const treatment = await this.service.getTreatmentById(id, Number(userId));
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil mengambil detail jadwal treatment",
        data: treatment,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil detail jadwal treatment",
      });
    }
  };

  createTreatment = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const validatedData = createTreatmentSchema.parse(req.body);
      const treatment = await this.service.createTreatment(Number(userId), validatedData);

      return res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "Berhasil membuat jadwal treatment baru",
        data: treatment,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: error.errors ? error.errors.map((e: any) => e.message).join(", ") : error.message || "Gagal membuat jadwal treatment",
      });
    }
  };

  updateTreatment = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      const { id } = req.params;

      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const validatedData = updateTreatmentSchema.parse(req.body);
      const updatedTreatment = await this.service.updateTreatment(id, Number(userId), validatedData);

      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil memperbarui jadwal treatment",
        data: updatedTreatment,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: error.errors ? error.errors.map((e: any) => e.message).join(", ") : error.message || "Gagal memperbarui jadwal treatment",
      });
    }
  };

  deleteTreatment = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      const { id } = req.params;

      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      await this.service.deleteTreatment(id, Number(userId));
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil menghapus jadwal treatment",
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal menghapus jadwal treatment",
      });
    }
  };

  // ================= JADWAL HABIT =================

  getHabits = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const habits = await this.service.getHabits(Number(userId));
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil mengambil daftar jadwal habit",
        data: habits,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil daftar jadwal habit",
      });
    }
  };

  getHabitById = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      const { id } = req.params;

      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const habit = await this.service.getHabitById(id, Number(userId));
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil mengambil detail jadwal habit",
        data: habit,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil detail jadwal habit",
      });
    }
  };

  createHabit = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const validatedData = createHabitSchema.parse(req.body);
      const habit = await this.service.createHabit(Number(userId), validatedData);

      return res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "Berhasil membuat jadwal habit baru",
        data: habit,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: error.errors ? error.errors.map((e: any) => e.message).join(", ") : error.message || "Gagal membuat jadwal habit",
      });
    }
  };

  updateHabit = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      const { id } = req.params;

      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const validatedData = updateHabitSchema.parse(req.body);
      const updatedHabit = await this.service.updateHabit(id, Number(userId), validatedData);

      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil memperbarui jadwal habit",
        data: updatedHabit,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: error.errors ? error.errors.map((e: any) => e.message).join(", ") : error.message || "Gagal memperbarui jadwal habit",
      });
    }
  };

  deleteHabit = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      const { id } = req.params;

      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      await this.service.deleteHabit(id, Number(userId));
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil menghapus jadwal habit",
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal menghapus jadwal habit",
      });
    }
  };
}
