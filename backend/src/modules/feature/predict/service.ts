import { StatusCodes } from "http-status-codes";
import { PredictRepository } from "./repository";
import type { PredictResponseSchema } from "./dto";
import {
  ServiceResponse,
  ServiceResponseSchema,
} from "../../../common/models/service_response";

export class PredictService {
  constructor(
    private readonly repository: PredictRepository = new PredictRepository(),
  ) {}

  async predictAsync(
    fileBuffer: Buffer,
    mimetype: string,
  ): Promise<ServiceResponseSchema<PredictResponseSchema | null>> {
    try {
      const result = await this.repository.sendToFlaskAsync(
        fileBuffer,
        mimetype,
      );

      return ServiceResponse.success("Prediksi berhasil", result);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred while predicting.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
