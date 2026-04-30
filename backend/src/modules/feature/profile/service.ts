import { ProfileRepository } from "./repository";
import { UpdateProfileDTO } from "./dto";
import { StatusCodes } from "http-status-codes";

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

  async updateProfile(userId: number, data: UpdateProfileDTO) {
    // Check if user exists
    await this.getProfile(userId);
    
    return await this.repository.updateProfile(userId, data);
  }
}
