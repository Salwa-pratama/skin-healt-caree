"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictService = void 0;
const http_status_codes_1 = require("http-status-codes");
const repository_1 = require("./repository");
const service_response_1 = require("../../../common/models/service_response");
const prisma_1 = require("../../../common/lib/prisma");
class PredictService {
    constructor(repository = new repository_1.PredictRepository()) {
        this.repository = repository;
    }
    async predictAsync(fileBuffer, mimetype) {
        try {
            const result = await this.repository.sendToFlaskAsync(fileBuffer, mimetype);
            let rekomendasiToReturn = undefined;
            if (result.jerawat) {
                const topPrediction = result.jerawat.toLowerCase();
                // Ambil data master rekomendasi dari database
                const masterSolutions = await prisma_1.prisma.acneSolution.findMany({
                    where: { userId: null },
                    include: {
                        goodIngredient: true,
                        badIngredient: true,
                        habits: true,
                        treatments: true
                    }
                });
                // Pencocokan logika seperti sebelumnya
                const mainRec = masterSolutions.find(r => {
                    if (!r.type)
                        return false;
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
                    };
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
            const finalResult = {
                jerawat: result.jerawat,
                predictions: result.predictions,
                rekomendasi: rekomendasiToReturn
            };
            return service_response_1.ServiceResponse.success("Prediksi berhasil", finalResult);
        }
        catch (error) {
            console.error("Error during prediction:", error);
            return service_response_1.ServiceResponse.failure("An error occurred while predicting.", null, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.PredictService = PredictService;
