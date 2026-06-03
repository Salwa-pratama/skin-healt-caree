"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const prisma_1 = require("../../../common/lib/prisma");
class TodoRepository {
    // ================= JADWAL TREATMENT =================
    async findTreatmentsByUserId(userId) {
        return await prisma_1.prisma.jadwalTreatment.findMany({
            where: {
                users: {
                    some: { id: userId },
                },
            },
            orderBy: {
                hari: "asc",
            },
        });
    }
    async findTreatmentById(id, userId) {
        return await prisma_1.prisma.jadwalTreatment.findFirst({
            where: {
                id,
                users: {
                    some: { id: userId },
                },
            },
        });
    }
    async createTreatment(userId, data) {
        return await prisma_1.prisma.jadwalTreatment.create({
            data: {
                nama: data.nama,
                tempat: data.tempat,
                hari: new Date(data.hari),
                pengingat: new Date(data.pengingat),
                users: {
                    connect: { id: userId },
                },
            },
        });
    }
    async updateTreatment(id, data) {
        const updateData = {};
        if (data.nama !== undefined)
            updateData.nama = data.nama;
        if (data.tempat !== undefined)
            updateData.tempat = data.tempat;
        if (data.hari !== undefined)
            updateData.hari = new Date(data.hari);
        if (data.pengingat !== undefined)
            updateData.pengingat = new Date(data.pengingat);
        return await prisma_1.prisma.jadwalTreatment.update({
            where: { id },
            data: updateData,
        });
    }
    async deleteTreatment(id) {
        return await prisma_1.prisma.jadwalTreatment.delete({
            where: { id },
        });
    }
    // ================= JADWAL HABIT =================
    async findHabitsByUserId(userId) {
        return await prisma_1.prisma.jadwalHabit.findMany({
            where: {
                users: {
                    some: { id: userId },
                },
            },
            orderBy: {
                id: "asc",
            },
        });
    }
    async findHabitById(id, userId) {
        return await prisma_1.prisma.jadwalHabit.findFirst({
            where: {
                id,
                users: {
                    some: { id: userId },
                },
            },
        });
    }
    async createHabit(userId, data) {
        return await prisma_1.prisma.jadwalHabit.create({
            data: {
                nama: data.nama,
                hari: data.hari,
                jam: data.jam,
                pengingat: data.pengingat,
                users: {
                    connect: { id: userId },
                },
            },
        });
    }
    async updateHabit(id, data) {
        return await prisma_1.prisma.jadwalHabit.update({
            where: { id },
            data,
        });
    }
    async deleteHabit(id) {
        return await prisma_1.prisma.jadwalHabit.delete({
            where: { id },
        });
    }
}
exports.TodoRepository = TodoRepository;
