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

  saveHistory = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { citra, name, predictions } = req.body;
      const saved = await this.service.saveScanAsync(userId, { citra, name, predictions });
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
