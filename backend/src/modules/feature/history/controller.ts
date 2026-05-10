import { Request, Response } from "express";
import { HistoryService } from "./service";

export class HistoryController {
  constructor(private readonly service: HistoryService = new HistoryService()) {}

  getHistory = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const history = await this.service.getHistoryAsync(userId);
      res.json({
        kode: 200,
        status: "success",
        data: history
      });
    } catch (error: any) {
      res.status(500).json({ kode: 500, status: "error", message: error.message });
    }
  };

  saveHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file;
      const userId = (req as any).user.userId || (req as any).user.id;
      const { jerawat, predictions} = req.body;

      if (!file) {
        res.status(400).json({ kode: 400, status: "error", message: "File gambar tidak ditemukan" });
        return;
      }

      if (!jerawat || !predictions) {
        res.status(400).json({ kode: 400, status: "error", message: "Data prediksi (jerawat & predictions) tidak lengkap" });
        return;
      }

      const saved = await this.service.saveHistoryAsync(file.buffer, userId, jerawat, predictions);

      res.json({
        kode: 200,
        status: "success",
        data: saved
      });
    } catch (error: any) {
      res.status(500).json({ kode: 500, status: "error", message: error.message });
    }
  };

  deleteHistory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.deleteHistoryAsync(Number(id));
      res.json({
        kode: 200,
        status: "success",
        message: "History deleted"
      });
    } catch (error: any) {
      res.status(500).json({ kode: 500, status: "error", message: error.message });
    }
  };
}
