import { Request, Response } from "express";
import { AdminService } from "./service";
import { StatusCodes } from "http-status-codes";

export class AdminController {
  private service: AdminService;

  constructor() {
    this.service = new AdminService();
  }

  getStats = async (req: Request, res: Response) => {
    try {
      const stats = await this.service.getStats();
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil mengambil statistik admin",
        data: stats,
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil statistik",
      });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.service.getAllUsers();
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil mengambil daftar user",
        data: users,
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil daftar user",
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "ID tidak valid",
        });
      }

      await this.service.deleteUser(id);
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil menghapus user",
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal menghapus user",
      });
    }
  };
}
