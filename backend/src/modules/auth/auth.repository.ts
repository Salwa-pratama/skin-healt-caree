import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmailAsync(email: string) {
    return this.prisma.userPublic.findUnique({ where: { email } }) ?? null;
  }

  async findByIdAsync(id: number) {
    return this.prisma.userPublic.findUnique({ where: { id } }) ?? null;
  }

  async createUserAsync(payload: any) {
    return this.prisma.userPublic.create({
      data: { ...payload, updatedAt: new Date() },
    });
  }

  async updateRefreshTokenAsync(userId: number, hash: string) {
    await this.prisma.userPublic.update({
      where: { id: userId },
      data: { refreshTokenHash: hash, updatedAt: new Date() },
    });
  }

  async clearRefreshTokenAsync(userId: number) {
    if (!userId) {
      throw new Error("Invalid User ID provided to clearRefreshTokenAsync");
    }
    await this.prisma.userPublic.update({
      where: { id: userId },
      data: { refreshTokenHash: null, updatedAt: new Date() },
    });
  }
}
