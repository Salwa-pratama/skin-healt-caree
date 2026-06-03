"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const prisma_1 = require("../../../common/lib/prisma");
class AuthRepository {
    async findByEmailAsync(email) {
        return prisma_1.prisma.userPublic.findUnique({ where: { email } }) ?? null;
    }
    async findByIdAsync(id) {
        return prisma_1.prisma.userPublic.findUnique({ where: { id } }) ?? null;
    }
    async createUserAsync(payload) {
        return prisma_1.prisma.userPublic.create({
            data: { ...payload, updatedAt: new Date() },
        });
    }
    async updateRefreshTokenAsync(userId, hash) {
        await prisma_1.prisma.userPublic.update({
            where: { id: userId },
            data: { refreshTokenHash: hash, updatedAt: new Date() },
        });
    }
    async clearRefreshTokenAsync(userId) {
        if (!userId) {
            throw new Error("Invalid User ID provided to clearRefreshTokenAsync");
        }
        await prisma_1.prisma.userPublic.update({
            where: { id: userId },
            data: { refreshTokenHash: null, updatedAt: new Date() },
        });
    }
}
exports.AuthRepository = AuthRepository;
