import { prisma } from "../../../common/lib/prisma";
import { CreateTreatmentDTO, UpdateTreatmentDTO, CreateHabitDTO, UpdateHabitDTO } from "./dto";

export class TodoRepository {
  // ================= JADWAL TREATMENT =================

  async findTreatmentsByUserId(userId: number) {
    return await prisma.jadwalTreatment.findMany({
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

  async findTreatmentById(id: string, userId: number) {
    return await prisma.jadwalTreatment.findFirst({
      where: {
        id,
        users: {
          some: { id: userId },
        },
      },
    });
  }

  async createTreatment(userId: number, data: CreateTreatmentDTO & { pengingat: string }) {
    return await prisma.jadwalTreatment.create({
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

  async updateTreatment(id: string, data: UpdateTreatmentDTO) {
    const updateData: any = {};
    if (data.nama !== undefined) updateData.nama = data.nama;
    if (data.tempat !== undefined) updateData.tempat = data.tempat;
    if (data.hari !== undefined) updateData.hari = new Date(data.hari);
    if (data.pengingat !== undefined) updateData.pengingat = new Date(data.pengingat);

    return await prisma.jadwalTreatment.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteTreatment(id: string) {
    return await prisma.jadwalTreatment.delete({
      where: { id },
    });
  }

  // ================= JADWAL HABIT =================

  async findHabitsByUserId(userId: number) {
    return await prisma.jadwalHabit.findMany({
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

  async findHabitById(id: string, userId: number) {
    return await prisma.jadwalHabit.findFirst({
      where: {
        id,
        users: {
          some: { id: userId },
        },
      },
    });
  }

  async createHabit(userId: number, data: CreateHabitDTO & { pengingat: string }) {
    return await prisma.jadwalHabit.create({
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

  async updateHabit(id: string, data: UpdateHabitDTO) {
    return await prisma.jadwalHabit.update({
      where: { id },
      data,
    });
  }

  async deleteHabit(id: string) {
    return await prisma.jadwalHabit.delete({
      where: { id },
    });
  }
}
