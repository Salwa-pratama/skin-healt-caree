import { Request, Response } from "express";
import { AcneSolutionService } from "./service";
import { createAcneSolutionSchema, updateAcneSolutionSchema } from "./dto";
import { StatusCodes } from "http-status-codes";

export class AcneSolutionController {
  private service: AcneSolutionService;

  constructor() {
    this.service = new AcneSolutionService();
  }

  getAllSolutions = async (req: Request, res: Response) => {
    try {
      const solutions = await this.service.getAllSolutions();
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil mengambil data master rekomendasi",
        data: solutions,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil data rekomendasi",
      });
    }
  };

  getSolutionById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "ID tidak valid",
        });
      }

      const solution = await this.service.getSolutionById(id);
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil mengambil detail rekomendasi",
        data: solution,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal mengambil detail rekomendasi",
      });
    }
  };

  createSolution = async (req: Request, res: Response) => {
    try {
      const validatedData = createAcneSolutionSchema.parse(req.body);
      const solution = await this.service.createSolution(validatedData);

      return res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "Berhasil membuat master rekomendasi baru",
        data: solution,
      });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: error.errors ? error.errors.map((e: any) => e.message).join(", ") : error.message || "Gagal membuat rekomendasi",
      });
    }
  };

  updateSolution = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "ID tidak valid",
        });
      }

      const validatedData = updateAcneSolutionSchema.parse(req.body);
      const updatedSolution = await this.service.updateSolution(id, validatedData);

      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil memperbarui rekomendasi",
        data: updatedSolution,
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: error.errors ? error.errors.map((e: any) => e.message).join(", ") : error.message || "Gagal memperbarui rekomendasi",
      });
    }
  };

  deleteSolution = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "ID tidak valid",
        });
      }

      await this.service.deleteSolution(id);
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Berhasil menghapus rekomendasi",
      });
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Gagal menghapus rekomendasi",
      });
    }
  };
}
