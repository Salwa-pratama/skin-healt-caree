"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const repository_1 = require("./repository");
const http_status_codes_1 = require("http-status-codes");
const cloudinary_1 = require("../../../utils/cloudinary");
class ProfileService {
    constructor() {
        this.repository = new repository_1.ProfileRepository();
    }
    async getProfile(userId) {
        const profile = await this.repository.getProfileById(userId);
        if (!profile) {
            throw { status: http_status_codes_1.StatusCodes.NOT_FOUND, message: "User profile not found" };
        }
        return profile;
    }
    async updateProfile(userId, data, fileBuffer) {
        // Check if user exists
        const existingProfile = await this.getProfile(userId);
        const finalData = { ...data };
        if (fileBuffer) {
            if (process.env.CLOUDINARY_API_SECRET) {
                const uploadToCloudinary = () => {
                    return new Promise((resolve, reject) => {
                        const uploadStream = cloudinary_1.cloudinary.uploader.upload_stream({ folder: "e-taqwa/profiles", resource_type: "auto" }, (error, result) => {
                            if (error)
                                return reject(error);
                            resolve(result);
                        });
                        uploadStream.end(fileBuffer);
                    });
                };
                const cloudinaryResult = await uploadToCloudinary();
                finalData.gambar = cloudinaryResult.secure_url;
                // Hapus gambar lama dari Cloudinary jika ada
                if (existingProfile.gambar && !existingProfile.gambar.startsWith("data:")) {
                    try {
                        const parts = existingProfile.gambar.split("/upload/");
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
                        console.error("Gagal menghapus foto profil lama di Cloudinary:", e);
                    }
                }
            }
            else {
                console.warn("⚠️ CLOUDINARY_API_SECRET is missing. Bypassing Cloudinary and storing avatar as base64.");
                const base64Image = fileBuffer.toString("base64");
                finalData.gambar = `data:image/jpeg;base64,${base64Image}`;
            }
        }
        return await this.repository.updateProfile(userId, finalData);
    }
}
exports.ProfileService = ProfileService;
