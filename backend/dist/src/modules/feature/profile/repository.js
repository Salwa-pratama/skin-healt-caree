"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRepository = void 0;
const prisma_1 = require("../../../common/lib/prisma");
class ProfileRepository {
    async getProfileById(userId) {
        return await prisma_1.prisma.userPublic.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                phone: true,
                skintype: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async updateProfile(userId, data) {
        return await prisma_1.prisma.userPublic.update({
            where: { id: userId },
            data,
        });
    }
}
exports.ProfileRepository = ProfileRepository;
