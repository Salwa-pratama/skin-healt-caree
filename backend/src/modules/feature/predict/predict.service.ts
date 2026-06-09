import { Injectable, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { PredictRepository } from './predict.repository';
import { SubscriptionService } from '../subscription/subscription.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PredictService {
  constructor(
    private readonly repository: PredictRepository,
    private readonly subscriptionService: SubscriptionService,
    private readonly prisma: PrismaService
  ) {}

  async predictAsync(userId: number, fileBuffer: Buffer, mimetype: string) {
    try {
      // 1. Check scan limit first
      let activeSub;
      try {
        activeSub = await this.subscriptionService.checkScanLimit(userId);
      } catch (limitError: any) {
        throw new ForbiddenException(limitError.message || "Batas upload scan telah habis");
      }

      // 2. Call prediction using plan model
      const result = await this.repository.sendToFlaskAsync(
        fileBuffer,
        mimetype,
        activeSub.plan.model
      );

      // 3. Increment scan count on success
      await this.subscriptionService.incrementScanCount(activeSub.id, activeSub.currentMonthScans);

      let rekomendasiToReturn: any = undefined;

      const jerawat = result.data?.top_prediction || result.jerawat;
      const predictions = result.data?.all_predictions || result.predictions;

      if (jerawat) {
        const topPrediction = jerawat.toLowerCase();
        
        // Ambil data master rekomendasi dari database
        const masterSolutions = await this.prisma.acneSolution.findMany({
          where: { userId: null },
          include: {
            goodIngredient: true,
            badIngredient: true,
            habits: true,
            treatments: true
          }
        });

        // Pencocokan logika
        const mainRec = masterSolutions.find(r => {
          if (!r.type) return false;
          const typeLower = r.type.toLowerCase();
          return typeLower.includes(topPrediction) || topPrediction.includes(typeLower) || 
                 (typeLower === "whitehead / blackhead" && (topPrediction.includes("whitehead") || topPrediction.includes("blackhead")));
        });

        if (mainRec) {
          rekomendasiToReturn = { 
            type: mainRec.type,
            description: mainRec.description,
            goodIngredients: mainRec.goodIngredient.map(g => g.name),
            badIngredients: mainRec.badIngredient.map(b => b.name),
            habits: mainRec.habits.map(h => h.name),
            treatments: mainRec.treatments.map(t => ({ name: t.name, time: t.time }))
          };

          if (predictions && predictions.length > 1) {
            const sortedPredictions = [...predictions].sort((a, b) => {
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

      const finalResult = {
        jerawat: jerawat,
        predictions: predictions,
        rekomendasi: rekomendasiToReturn
      };

      return {
        status: "success",
        statusCode: 200,
        message: "Prediksi berhasil",
        data: finalResult
      };
    } catch (error: any) {
      if (error instanceof ForbiddenException) throw error;
      console.error("Error during prediction:", error);
      throw new InternalServerErrorException("An error occurred while predicting.");
    }
  }
}
