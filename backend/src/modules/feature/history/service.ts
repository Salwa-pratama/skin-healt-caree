import { HistoryRepository } from "./repository";
import { cloudinary } from "../../../utils/cloudinary";
import { prisma } from "../../../common/lib/prisma";
import { acneRecommendations } from "../../../database/prisma/seeding/rekomendation_seed";

export class HistoryService {
  constructor(private readonly repository: HistoryRepository = new HistoryRepository()) {}

  async saveHistoryAsync(fileBuffer: Buffer, userId: number, jerawat: string, predictionsString: string) {
    let predictions = [];
    try {
      predictions = JSON.parse(predictionsString);
    } catch(e) {
      // Abaikan atau handle
    }

    // 1. Upload image to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "acne_scan_history" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(fileBuffer);
    });

    const cloudinaryResult: any = await uploadPromise;
    const citraUrl = cloudinaryResult.secure_url;

    // 2. Cari Rekomendasi
    let mainRec = acneRecommendations.find(r => {
      const typeLower = r.type.toLowerCase();
      const topPrediction = jerawat.toLowerCase();
      return typeLower.includes(topPrediction) || topPrediction.includes(typeLower) || 
             (typeLower === "whitehead / blackhead" && (topPrediction.includes("whitehead") || topPrediction.includes("blackhead")));
    });

    // 3. Nested Write Prisma
    const saved = await prisma.acneProblem.create({
      data: {
        userId: userId,
        name: jerawat,
        citra: citraUrl,
        predictions: predictions as any,
        acneProblemSolutions: mainRec ? {
          create: [
            {
              user: { connect: { id: userId } },
              acneSolution: {
                create: {
                  goodIngredient: { create: mainRec.goodIngredients.map(name => ({ name })) },
                  badIngredient: { create: mainRec.badIngredients.map(name => ({ name })) },
                  habits: { create: mainRec.habits.map(name => ({ name })) },
                  treatments: { create: (mainRec as any).treatments.map((t: any) => ({ name: t.name, time: t.time })) }
                }
              }
            }
          ]
        } : undefined
      }
    });

    return saved;
  }

  async getHistoryAsync(userId: number) {
    return this.repository.getHistoryAsync(userId);
  }

  async deleteHistoryAsync(id: number) {
    return this.repository.deleteHistoryAsync(id);
  }
}
