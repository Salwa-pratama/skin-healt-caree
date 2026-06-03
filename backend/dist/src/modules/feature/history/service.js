"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const repository_1 = require("./repository");
const cloudinary_1 = require("../../../utils/cloudinary");
const prisma_1 = require("../../../common/lib/prisma");
const rekomendation_seed_1 = require("../../../database/prisma/seeding/rekomendation_seed");
class HistoryService {
    constructor(repository = new repository_1.HistoryRepository()) {
        this.repository = repository;
    }
    async saveHistoryAsync(fileBuffer, userId, jerawat, predictionsInput) {
        let predictions = [];
        // Handle predictions input which could be a JSON string or an object/array
        if (typeof predictionsInput === "string") {
            try {
                predictions = JSON.parse(predictionsInput);
            }
            catch (e) {
                console.error("Failed to parse predictions JSON:", e);
                predictions = [];
            }
        }
        else {
            predictions = predictionsInput;
        }
        // 1. Upload image to Cloudinary with fallback to Base64
        let citraUrl = "";
        if (process.env.CLOUDINARY_API_SECRET) {
            const uploadToCloudinary = () => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary_1.cloudinary.uploader.upload_stream({
                        folder: "e-taqwa/history",
                        resource_type: "auto",
                    }, (error, result) => {
                        if (error)
                            return reject(error);
                        resolve(result);
                    });
                    uploadStream.end(fileBuffer);
                });
            };
            const cloudinaryResult = await uploadToCloudinary();
            citraUrl = cloudinaryResult.secure_url;
        }
        else {
            console.warn("⚠️ CLOUDINARY_API_SECRET is missing. Bypassing Cloudinary and storing image as base64 in database.");
            const base64Image = fileBuffer.toString("base64");
            citraUrl = `data:image/jpeg;base64,${base64Image}`;
        }
        // 2. Find Recommendation based on top prediction
        const mainRec = rekomendation_seed_1.acneRecommendations.find((r) => {
            const typeLower = r.type.toLowerCase();
            const topPrediction = jerawat.toLowerCase();
            return (typeLower.includes(topPrediction) ||
                topPrediction.includes(typeLower) ||
                (typeLower === "whitehead / blackhead" &&
                    (topPrediction.includes("whitehead") ||
                        topPrediction.includes("blackhead"))));
        });
        // 3. Save to Database with nested relations as per schema
        const saved = await prisma_1.prisma.acneProblem.create({
            data: {
                user: { connect: { id: userId } },
                name: jerawat,
                citra: citraUrl,
                predictions: predictions,
                acneProblemSolutions: mainRec
                    ? {
                        create: [
                            {
                                user: { connect: { id: userId } }, // Explicitly connect user in pivot
                                acneSolution: {
                                    create: {
                                        user: { connect: { id: userId } },
                                        goodIngredient: {
                                            create: mainRec.goodIngredients.map((name) => ({
                                                name,
                                            })),
                                        },
                                        badIngredient: {
                                            create: mainRec.badIngredients.map((name) => ({
                                                name,
                                            })),
                                        },
                                        habits: {
                                            create: mainRec.habits.map((name) => ({ name })),
                                        },
                                        treatments: {
                                            create: mainRec.treatments.map((t) => ({
                                                name: t.name,
                                                time: t.time,
                                            })),
                                        },
                                    },
                                },
                            },
                        ],
                    }
                    : undefined,
            },
            include: {
                acneProblemSolutions: {
                    include: {
                        acneSolution: {
                            include: {
                                goodIngredient: true,
                                badIngredient: true,
                                habits: true,
                                treatments: true,
                            },
                        },
                    },
                },
            },
        });
        return saved;
    }
    async getHistoryAsync(userId) {
        return this.repository.getHistoryAsync(userId);
    }
    async getHistoryByIdAsync(userId, id) {
        return this.repository.getHistoryByIdAsync(userId, id);
    }
    async updateHistoryAsync(id, userId, fileBuffer, jerawat, predictionsInput) {
        // 1. Check if history exists
        const existingHistory = await this.repository.getHistoryByIdAsync(userId, id);
        if (!existingHistory) {
            throw new Error("History tidak ditemukan");
        }
        let updateData = {};
        // 2. Handle image upload if a new file is provided
        if (fileBuffer) {
            if (process.env.CLOUDINARY_API_SECRET) {
                const uploadToCloudinary = () => {
                    return new Promise((resolve, reject) => {
                        const uploadStream = cloudinary_1.cloudinary.uploader.upload_stream({ folder: "e-taqwa/history", resource_type: "auto" }, (error, result) => {
                            if (error)
                                return reject(error);
                            resolve(result);
                        });
                        uploadStream.end(fileBuffer);
                    });
                };
                const cloudinaryResult = await uploadToCloudinary();
                updateData.citra = cloudinaryResult.secure_url;
                // Hapus gambar lama dari Cloudinary
                if (existingHistory.citra) {
                    try {
                        const parts = existingHistory.citra.split("/upload/");
                        if (parts.length > 1) {
                            const afterUpload = parts[1];
                            const withoutVersion = afterUpload.substring(afterUpload.indexOf("/") + 1);
                            const publicId = withoutVersion.substring(0, withoutVersion.lastIndexOf("."));
                            if (publicId) {
                                await cloudinary_1.cloudinary.uploader.destroy(publicId);
                            }
                        }
                    }
                    catch (e) {
                        console.error("Gagal menghapus gambar lama di Cloudinary:", e);
                    }
                }
            }
            else {
                console.warn("⚠️ CLOUDINARY_API_SECRET is missing. Bypassing Cloudinary and storing updated image as base64.");
                const base64Image = fileBuffer.toString("base64");
                updateData.citra = `data:image/jpeg;base64,${base64Image}`;
            }
        }
        // 3. Handle predictions update
        if (predictionsInput) {
            if (typeof predictionsInput === "string") {
                try {
                    updateData.predictions = JSON.parse(predictionsInput);
                }
                catch (e) {
                    console.error("Failed to parse predictions JSON:", e);
                }
            }
            else {
                updateData.predictions = predictionsInput;
            }
        }
        // 4. Handle jerawat update (and regenerate recommendations)
        if (jerawat) {
            updateData.name = jerawat;
            const mainRec = rekomendation_seed_1.acneRecommendations.find((r) => {
                const typeLower = r.type.toLowerCase();
                const topPrediction = jerawat.toLowerCase();
                return (typeLower.includes(topPrediction) ||
                    topPrediction.includes(typeLower) ||
                    (typeLower === "whitehead / blackhead" &&
                        (topPrediction.includes("whitehead") ||
                            topPrediction.includes("blackhead"))));
            });
            // We need to delete old pivot tables in repository before updating
            await this.repository.deletePivotRecords(id);
            if (mainRec) {
                updateData.acneProblemSolutions = {
                    create: [
                        {
                            user: { connect: { id: userId } },
                            acneSolution: {
                                create: {
                                    goodIngredient: {
                                        create: mainRec.goodIngredients.map((name) => ({ name })),
                                    },
                                    badIngredient: {
                                        create: mainRec.badIngredients.map((name) => ({ name })),
                                    },
                                    habits: { create: mainRec.habits.map((name) => ({ name })) },
                                    treatments: {
                                        create: mainRec.treatments.map((t) => ({
                                            name: t.name,
                                            time: t.time,
                                        })),
                                    },
                                },
                            },
                        },
                    ],
                };
            }
        }
        // 5. Save update to Database
        return this.repository.updateHistoryAsync(id, updateData);
    }
    async deleteHistoryAsync(userId, id) {
        const existingHistory = await this.repository.getHistoryByIdAsync(userId, id);
        if (!existingHistory) {
            throw new Error("History tidak ditemukan");
        }
        // Hapus gambar dari Cloudinary (jika di-upload menggunakan Cloudinary)
        if (existingHistory.citra && process.env.CLOUDINARY_API_SECRET && !existingHistory.citra.startsWith("data:")) {
            try {
                const parts = existingHistory.citra.split("/upload/");
                if (parts.length > 1) {
                    const afterUpload = parts[1];
                    const withoutVersion = afterUpload.substring(afterUpload.indexOf("/") + 1);
                    const publicId = withoutVersion.substring(0, withoutVersion.lastIndexOf("."));
                    if (publicId) {
                        await cloudinary_1.cloudinary.uploader.destroy(publicId);
                    }
                }
            }
            catch (e) {
                console.error("Gagal menghapus gambar di Cloudinary:", e);
            }
        }
        return this.repository.deleteHistoryAsync(id);
    }
}
exports.HistoryService = HistoryService;
