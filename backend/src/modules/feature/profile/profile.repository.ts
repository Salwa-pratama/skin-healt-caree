import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProfileById(userId: number) {
    return this.prisma.userPublic.findUnique({
      where: { id: userId },
      select: {
        id: true, email: true, name: true, role: true,
        phone: true, skintype: true, avatar: true,
        createdAt: true, updatedAt: true,
        userSubscriptions: {
          where: { status: 'active' },
          include: {
            plan: true,
          },
        },
      },
    });
  }

  async updateProfile(userId: number, data: any) {
    return this.prisma.userPublic.update({
      where: { id: userId },
      data,
    });
  }
}
