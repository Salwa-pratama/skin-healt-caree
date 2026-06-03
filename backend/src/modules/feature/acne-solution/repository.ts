import { prisma } from "../../../common/lib/prisma";
import { CreateAcneSolutionDTO, UpdateAcneSolutionDTO } from "./dto";

export class AcneSolutionRepository {
  async findAll() {
    return prisma.acneSolution.findMany({
      where: { userId: null as any },
      include: {
        goodIngredient: true,
        badIngredient: true,
        habits: true,
        treatments: true
      }
    });
  }

  async findById(id: number) {
    return prisma.acneSolution.findUnique({
      where: { id },
      include: {
        goodIngredient: true,
        badIngredient: true,
        habits: true,
        treatments: true
      }
    });
  }

  async create(data: CreateAcneSolutionDTO) {
    return prisma.acneSolution.create({
      data: {
        type: data.type,
        description: data.description,
        userId: null as any,
        goodIngredient: { create: data.goodIngredients.map(name => ({ name })) },
        badIngredient: { create: data.badIngredients.map(name => ({ name })) },
        habits: { create: data.habits.map(name => ({ name })) },
        treatments: { create: data.treatments.map(t => ({ name: t.name, time: t.time })) }
      },
      include: {
        goodIngredient: true,
        badIngredient: true,
        habits: true,
        treatments: true
      }
    });
  }

  async update(id: number, data: UpdateAcneSolutionDTO) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.acneSolution.findUnique({
        where: { id },
        include: { goodIngredient: true, badIngredient: true, habits: true, treatments: true }
      });

      if (!existing) throw new Error("AcneSolution not found");

      const updateData: any = {};
      if (data.type !== undefined) updateData.type = data.type;
      if (data.description !== undefined) updateData.description = data.description;

      if (data.goodIngredients) {
        await tx.goodIngredient.deleteMany({ where: { id: { in: existing.goodIngredient.map(g => g.id) } } });
        updateData.goodIngredient = { create: data.goodIngredients.map(name => ({ name })) };
      }
      if (data.badIngredients) {
        await tx.badIngredient.deleteMany({ where: { id: { in: existing.badIngredient.map(b => b.id) } } });
        updateData.badIngredient = { create: data.badIngredients.map(name => ({ name })) };
      }
      if (data.habits) {
        await tx.habit.deleteMany({ where: { id: { in: existing.habits.map(h => h.id) } } });
        updateData.habits = { create: data.habits.map(name => ({ name })) };
      }
      if (data.treatments) {
        await tx.treatment.deleteMany({ where: { id: { in: existing.treatments.map(t => t.id) } } });
        updateData.treatments = { create: data.treatments.map(t => ({ name: t.name, time: t.time })) };
      }

      return tx.acneSolution.update({
        where: { id },
        data: updateData,
        include: { goodIngredient: true, badIngredient: true, habits: true, treatments: true }
      });
    });
  }

  async delete(id: number) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.acneSolution.findUnique({
        where: { id },
        include: { goodIngredient: true, badIngredient: true, habits: true, treatments: true }
      });
      if (existing) {
        await tx.goodIngredient.deleteMany({ where: { id: { in: existing.goodIngredient.map(g => g.id) } } });
        await tx.badIngredient.deleteMany({ where: { id: { in: existing.badIngredient.map(b => b.id) } } });
        await tx.habit.deleteMany({ where: { id: { in: existing.habits.map(h => h.id) } } });
        await tx.treatment.deleteMany({ where: { id: { in: existing.treatments.map(t => t.id) } } });
      }
      return tx.acneSolution.delete({ where: { id } });
    });
  }
}
