import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateTreatmentSchema = z.object({
  nama: z.string().min(1, "Nama treatment tidak boleh kosong"),
  tempat: z.string().min(1, "Tempat tidak boleh kosong"),
  hari: z.string().datetime({ message: "Format hari harus berupa ISO string (contoh: 2024-10-18T10:00:00.000Z)" }),
  pengingat: z.string().datetime().optional(),
});
export class CreateTreatmentDto extends createZodDto(CreateTreatmentSchema) {}

export const UpdateTreatmentSchema = CreateTreatmentSchema.partial();
export class UpdateTreatmentDto extends createZodDto(UpdateTreatmentSchema) {}

export const CreateHabitSchema = z.object({
  nama: z.string().min(1, "Nama habit tidak boleh kosong"),
  hari: z.array(z.string()).min(1, "Pilih setidaknya 1 hari"),
  jam: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format jam harus HH:mm (contoh: 08:30)"),
  pengingat: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
});
export class CreateHabitDto extends createZodDto(CreateHabitSchema) {}

export const UpdateHabitSchema = CreateHabitSchema.partial();
export class UpdateHabitDto extends createZodDto(UpdateHabitSchema) {}
