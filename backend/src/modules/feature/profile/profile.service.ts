import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { UpdateProfileDto } from './dto/profile.dto';
import { cloudinary } from '../../../utils/cloudinary';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async getProfile(userId: number) {
    const profile = await this.repository.getProfileById(userId);
    if (!profile) throw new NotFoundException("User profile not found");
    return profile;
  }

  async updateProfile(userId: number, data: UpdateProfileDto, fileBuffer?: Buffer) {
    const existingProfile = await this.getProfile(userId);
    const finalData: any = { ...data };

    if (fileBuffer) {
      if (process.env.CLOUDINARY_API_SECRET) {
        const cloudinaryResult: any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: "e-taqwa/profiles", resource_type: "auto" }, (error, result) => {
            if (error) return reject(error); resolve(result);
          }).end(fileBuffer);
        });
        finalData.avatar = cloudinaryResult.secure_url;

        if (existingProfile.avatar && !existingProfile.avatar.startsWith("data:")) {
          try {
            const parts = existingProfile.avatar.split("/upload/");
            if (parts.length > 1) {
              const publicId = parts[1].substring(parts[1].indexOf("/") + 1).split(".")[0];
              if (publicId) await cloudinary.uploader.destroy(publicId);
            }
          } catch (e) {}
        }
      } else {
        finalData.avatar = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;
      }
    }

    return this.repository.updateProfile(userId, finalData);
  }
}
