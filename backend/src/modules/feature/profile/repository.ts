import { prisma } from "../../../common/lib/prisma";
import { UpdateProfileDTO } from "./dto";

export class ProfileRepository {
  async getProfileById(userId: number) {
    return await prisma.userPublic.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        skintype: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateProfile(userId: number, data: UpdateProfileDTO) {
    return await prisma.userPublic.update({
      where: { id: userId },
      data,
    });
  }
}
