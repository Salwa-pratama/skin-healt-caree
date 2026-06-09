import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ================= JADWAL TREATMENT =================
  async findTreatmentsByUserId(userId: number) {
    return this.prisma.jadwalTreatment.findMany({
      where: { users: { some: { id: userId } } },
      orderBy: { hari: "asc" },
    });
  }

  async findTreatmentById(id: string, userId: number) {
    return this.prisma.jadwalTreatment.findFirst({
      where: { id, users: { some: { id: userId } } },
    });
  }

  async createTreatment(userId: number, data: any) {
    return this.prisma.jadwalTreatment.create({
      data: {
        nama: data.nama,
        tempat: data.tempat,
        hari: new Date(data.hari),
        pengingat: new Date(data.pengingat),
        users: { connect: { id: userId } },
      },
    });
  }

  async updateTreatment(id: string, data: any) {
    const updateData: any = {};
    if (data.nama !== undefined) updateData.nama = data.nama;
    if (data.tempat !== undefined) updateData.tempat = data.tempat;
    if (data.hari !== undefined) updateData.hari = new Date(data.hari);
    if (data.pengingat !== undefined) updateData.pengingat = new Date(data.pengingat);

    return this.prisma.jadwalTreatment.update({ where: { id }, data: updateData });
  }

  async deleteTreatment(id: string) {
    return this.prisma.jadwalTreatment.delete({ where: { id } });
  }

  // ================= JADWAL HABIT =================
  async findHabitsByUserId(userId: number) {
    return this.prisma.jadwalHabit.findMany({
      where: { users: { some: { id: userId } } },
      orderBy: { id: "asc" },
    });
  }

  async findHabitById(id: string, userId: number) {
    return this.prisma.jadwalHabit.findFirst({
      where: { id, users: { some: { id: userId } } },
    });
  }

  async createHabit(userId: number, data: any) {
    return this.prisma.jadwalHabit.create({
      data: {
        nama: data.nama, hari: data.hari, jam: data.jam, pengingat: data.pengingat,
        users: { connect: { id: userId } },
      },
    });
  }

  async updateHabit(id: string, data: any) {
    return this.prisma.jadwalHabit.update({ where: { id }, data });
  }

  async deleteHabit(id: string) {
    return this.prisma.jadwalHabit.delete({ where: { id } });
  }
}
