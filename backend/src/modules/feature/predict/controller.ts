import { Request, Response } from "express";
import { PredictService } from "./service";

export class PredictController {
  constructor(
    private readonly service: PredictService = new PredictService(),
  ) {}

  predict = async (req: Request, res: Response): Promise<void> => {
    const file = req.file;

    if (!file) {
      res.status(400).json({ success: false, message: "File tidak ditemukan" });
      return;
    }

    const result = await this.service.predictAsync(file.buffer, file.mimetype);
    res.status(result.statusCode).json(result);
  };
}
