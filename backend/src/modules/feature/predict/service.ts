import { StatusCodes } from "http-status-codes";
import { PredictRepository } from "./repository";
import type { PredictResponseSchema } from "./dto";
import {
  ServiceResponse,
  ServiceResponseSchema,
} from "../../../common/models/service_response";
import { cloudinary } from "../../../utils/cloudinary";
import { prisma } from "../../../common/lib/prisma";

export class PredictService {
  constructor(
    private readonly repository: PredictRepository = new PredictRepository(),
  ) {}

  async predictAsync(
    fileBuffer: Buffer,
    mimetype: string
  ): Promise<ServiceResponseSchema<PredictResponseSchema | null>> {
    try {
      const result = await this.repository.sendToFlaskAsync(
        fileBuffer,
        mimetype,
      );

      let rekomendasiToReturn = undefined;

      if (result.jerawat) {
        const topPrediction = result.jerawat.toLowerCase();
        
        // Ambil data master rekomendasi dari database
        const masterSolutions = await prisma.acneSolution.findMany({
          where: { userId: null as any },
          include: {
            goodIngredient: true,
            badIngredient: true,
            habits: true,
            treatments: true
          }
        });

        // Pencocokan logika seperti sebelumnya
        const mainRec = masterSolutions.find(r => {
          if (!r.type) return false;
          const typeLower = r.type.toLowerCase();
          return typeLower.includes(topPrediction) || topPrediction.includes(typeLower) || 
                 (typeLower === "whitehead / blackhead" && (topPrediction.includes("whitehead") || topPrediction.includes("blackhead")));
        });

        if (mainRec) {
          // Mapping data dari database ke format response yang diharapkan frontend
          rekomendasiToReturn = { 
            type: mainRec.type,
            description: mainRec.description,
            goodIngredients: mainRec.goodIngredient.map(g => g.name),
            badIngredients: mainRec.badIngredient.map(b => b.name),
            habits: mainRec.habits.map(h => h.name),
            treatments: mainRec.treatments.map(t => ({ name: t.name, time: t.time }))
          } as any;

          if (result.predictions && result.predictions.length > 1) {
            const sortedPredictions = [...result.predictions].sort((a, b) => {
              const valA = parseFloat(a.persentase.replace("%", ""));
              const valB = parseFloat(b.persentase.replace("%", ""));
              return valB - valA;
            });

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
      console.error("Error during prediction:", error);
      return ServiceResponse.failure(
        "An error occurred while predicting.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
}
}
