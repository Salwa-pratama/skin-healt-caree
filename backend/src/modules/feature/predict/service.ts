import { StatusCodes } from "http-status-codes";
import { PredictRepository } from "./repository";
import type { PredictResponseSchema } from "./dto";
import {
  ServiceResponse,
  ServiceResponseSchema,
} from "../../../common/models/service_response";
import { acneRecommendations } from "../../../database/prisma/seeding/rekomendation_seed";

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

      let rekomendasiToReturn = undefined;

      if (result.jerawat) {
        // Cari rekomendasi yang sesuai dengan top_prediction
        const topPrediction = result.jerawat.toLowerCase();
        const mainRec = acneRecommendations.find(r => {
          const typeLower = r.type.toLowerCase();
          return typeLower.includes(topPrediction) || topPrediction.includes(typeLower) || 
                 (typeLower === "whitehead / blackhead" && (topPrediction.includes("whitehead") || topPrediction.includes("blackhead")));
        });

        if (mainRec) {
          rekomendasiToReturn = { ...mainRec } as any;

          if (result.predictions && result.predictions.length > 1) {
            // Urutkan dari persentase terbesar ke terkecil
            const sortedPredictions = [...result.predictions].sort((a, b) => {
              const valA = parseFloat(a.persentase.replace("%", ""));
              const valB = parseFloat(b.persentase.replace("%", ""));
              return valB - valA;
            });

            // Ambil peringkat ke-2
            const secondPrediction = sortedPredictions[1];
            if (secondPrediction) {
              const secondVal = parseFloat(secondPrediction.persentase.replace("%", ""));
              if (secondVal > 30) {
                rekomendasiToReturn.catatan_tambahan = `Kamu juga memiliki indikasi ${secondPrediction.label} sebesar ${secondPrediction.persentase}. Jangan lupa untuk tetap menjaga kebersihan wajah ya!`;
              }
            }
          }
        }
      }

      const finalResult: PredictResponseSchema = {
        jerawat: result.jerawat,
        predictions: result.predictions,
        rekomendasi: rekomendasiToReturn
      };

      return ServiceResponse.success("Prediksi berhasil", finalResult);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred while predicting.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
