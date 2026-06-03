import { ProfileRepository } from "./repository";
import { UpdateProfileDTO } from "./dto";
import { StatusCodes } from "http-status-codes";
import { cloudinary } from "../../../utils/cloudinary";

export class ProfileService {
  private repository: ProfileRepository;

  constructor() {
    this.repository = new ProfileRepository();
  }

  async getProfile(userId: number) {
    const profile = await this.repository.getProfileById(userId);
    if (!profile) {
      throw { status: StatusCodes.NOT_FOUND, message: "User profile not found" };
    }
    return profile;
  }

  async updateProfile(userId: number, data: UpdateProfileDTO, fileBuffer?: Buffer) {
    // Check if user exists
    const existingProfile = await this.getProfile(userId);
    const finalData = { ...data };

    if (fileBuffer) {
      if (process.env.CLOUDINARY_API_SECRET) {
        const uploadToCloudinary = () => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "e-taqwa/profiles", resource_type: "auto" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              },
            );
            uploadStream.end(fileBuffer);
          });
        };
        const cloudinaryResult: any = await uploadToCloudinary();
        finalData.avatar = cloudinaryResult.secure_url;

        // Hapus gambar lama dari Cloudinary jika ada
        if (existingProfile.avatar && !existingProfile.avatar.startsWith("data:")) {
          try {
            const parts = existingProfile.avatar.split("/upload/");
            if (parts.length > 1) {
              const afterUpload = parts[1];
              const withoutVersion = afterUpload.substring(
                afterUpload.indexOf("/") + 1,
              );
              const publicId = withoutVersion.substring(
                0,
                withoutVersion.lastIndexOf("."),
              );
              if (publicId) {
                await cloudinary.uploader.destroy(publicId);
              }
            }
          } catch (e) {
            console.error("Gagal menghapus foto profil lama di Cloudinary:", e);
          }
        }
      } else {
        console.warn("⚠️ CLOUDINARY_API_SECRET is missing. Bypassing Cloudinary and storing avatar as base64.");
        const base64Image = fileBuffer.toString("base64");
        finalData.avatar = `data:image/jpeg;base64,${base64Image}`;
      }
    }

    return await this.repository.updateProfile(userId, finalData);
  }
}
