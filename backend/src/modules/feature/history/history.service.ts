import { Injectable, NotFoundException } from '@nestjs/common';
import { HistoryRepository } from './history.repository';
import { cloudinary } from '../../../utils/cloudinary';
import { PrismaService } from '../../../prisma/prisma.service';
import { acneRecommendations } from '../../../database/prisma/seeding/rekomendation_seed';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class HistoryService {
  constructor(
    private readonly repository: HistoryRepository,
    private readonly subscriptionService: SubscriptionService,
    private readonly prisma: PrismaService,
  ) {}

  async saveHistoryAsync(fileBuffer: Buffer, userId: number, jerawat: string, predictionsInput: any) {
    await this.subscriptionService.checkHistoryLimit(userId);
    let predictions = typeof predictionsInput === "string" ? JSON.parse(predictionsInput || "[]") : predictionsInput;

    let citraUrl = "";
    if (process.env.CLOUDINARY_API_SECRET) {
      const cloudinaryResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "e-taqwa/history", resource_type: "auto" }, (error, result) => {
          if (error) return reject(error); resolve(result);
        }).end(fileBuffer);
      });
      citraUrl = cloudinaryResult.secure_url;
    } else {
      citraUrl = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;
    }

    const mainRec = acneRecommendations.find((r) => {
      const typeLower = r.type.toLowerCase();
      const topPrediction = jerawat.toLowerCase();
      return typeLower.includes(topPrediction) || topPrediction.includes(typeLower) || 
        (typeLower === "whitehead / blackhead" && (topPrediction.includes("whitehead") || topPrediction.includes("blackhead")));
    });

    return this.prisma.acneProblem.create({
      data: {
        user: { connect: { id: userId } },
        name: jerawat, citra: citraUrl, predictions,
        acneProblemSolutions: mainRec ? {
          create: [{
            user: { connect: { id: userId } },
            acneSolution: {
              create: {
                user: { connect: { id: userId } },
                goodIngredient: { create: mainRec.goodIngredients.map((name) => ({ name })) },
                badIngredient: { create: mainRec.badIngredients.map((name) => ({ name })) },
                habits: { create: mainRec.habits.map((name) => ({ name })) },
                treatments: { create: mainRec.treatments.map((t: any) => ({ name: t.name, time: t.time })) },
              },
            },
          }],
        } : undefined,
      },
      include: { acneProblemSolutions: { include: { acneSolution: { include: { goodIngredient: true, badIngredient: true, habits: true, treatments: true } } } } },
    });
  }

  async getHistoryAsync(userId: number) {
    return this.repository.getHistoryAsync(userId);
  }

  async getHistoryByIdAsync(userId: number, id: number) {
    return this.repository.getHistoryByIdAsync(userId, id);
  }

  async updateHistoryAsync(id: number, userId: number, fileBuffer: Buffer | undefined, jerawat: string | undefined, predictionsInput: any) {
    const existing = await this.repository.getHistoryByIdAsync(userId, id);
    if (!existing) throw new NotFoundException("History tidak ditemukan");

    let updateData: any = {};
    if (fileBuffer) {
      if (process.env.CLOUDINARY_API_SECRET) {
        const cloudinaryResult: any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: "e-taqwa/history", resource_type: "auto" }, (error, result) => {
            if (error) return reject(error); resolve(result);
          }).end(fileBuffer);
        });
        updateData.citra = cloudinaryResult.secure_url;

        if (existing.citra) {
          try {
            const parts = existing.citra.split("/upload/");
            if (parts.length > 1) {
              const publicId = parts[1].substring(parts[1].indexOf("/") + 1).split(".")[0];
              if (publicId) await cloudinary.uploader.destroy(publicId);
            }
          } catch (e) {}
        }
      } else {
        updateData.citra = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;
      }
    }

    if (predictionsInput) updateData.predictions = typeof predictionsInput === "string" ? JSON.parse(predictionsInput) : predictionsInput;

    if (jerawat) {
      updateData.name = jerawat;
      const mainRec = acneRecommendations.find((r) => {
        const typeLower = r.type.toLowerCase(); const topPrediction = jerawat.toLowerCase();
        return typeLower.includes(topPrediction) || topPrediction.includes(typeLower) || 
          (typeLower === "whitehead / blackhead" && (topPrediction.includes("whitehead") || topPrediction.includes("blackhead")));
      });
      await this.repository.deletePivotRecords(id);
      if (mainRec) {
        updateData.acneProblemSolutions = {
          create: [{
            user: { connect: { id: userId } },
            acneSolution: {
              create: {
                goodIngredient: { create: mainRec.goodIngredients.map((name) => ({ name })) },
                badIngredient: { create: mainRec.badIngredients.map((name) => ({ name })) },
                habits: { create: mainRec.habits.map((name) => ({ name })) },
                treatments: { create: mainRec.treatments.map((t: any) => ({ name: t.name, time: t.time })) },
              },
            },
          }],
        };
      }
    }
    return this.repository.updateHistoryAsync(id, updateData);
  }

  async deleteHistoryAsync(userId: number, id: number) {
    const existing = await this.repository.getHistoryByIdAsync(userId, id);
    if (!existing) throw new NotFoundException("History tidak ditemukan");
    if (existing.citra && process.env.CLOUDINARY_API_SECRET && !existing.citra.startsWith("data:")) {
      try {
        const parts = existing.citra.split("/upload/");
        if (parts.length > 1) {
          const publicId = parts[1].substring(parts[1].indexOf("/") + 1).split(".")[0];
          if (publicId) await cloudinary.uploader.destroy(publicId);
        }
      } catch (e) {}
    }
    return this.repository.deleteHistoryAsync(id);
  }
}
