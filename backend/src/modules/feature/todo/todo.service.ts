import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTreatmentDto, UpdateTreatmentDto, CreateHabitDto, UpdateHabitDto } from './dto/todo.dto';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class TodoService {
  constructor(
    private readonly repository: TodoRepository,
    private readonly subscriptionService: SubscriptionService
  ) {}

  async getTreatments(userId: number) { return this.repository.findTreatmentsByUserId(userId); }

  async getTreatmentById(id: string, userId: number) {
    const treatment = await this.repository.findTreatmentById(id, userId);
    if (!treatment) throw new NotFoundException("Jadwal treatment tidak ditemukan atau Anda tidak memiliki akses");
    return treatment;
  }

  async createTreatment(userId: number, data: CreateTreatmentDto) {
    await this.subscriptionService.checkTodoLimit(userId);
    const calculatedReminder = (data as any).pengingat || new Date(new Date((data as any).hari).getTime() - 24 * 60 * 60 * 1000).toISOString();
    return this.repository.createTreatment(userId, { ...data, pengingat: calculatedReminder });
  }

  async updateTreatment(id: string, userId: number, data: UpdateTreatmentDto) {
    await this.getTreatmentById(id, userId);
    let calculatedReminder = (data as any).pengingat;
    if ((data as any).hari && !(data as any).pengingat) calculatedReminder = new Date(new Date((data as any).hari).getTime() - 24 * 60 * 60 * 1000).toISOString();
    return this.repository.updateTreatment(id, { ...data, pengingat: calculatedReminder });
  }

  async deleteTreatment(id: string, userId: number) {
    await this.getTreatmentById(id, userId);
    return this.repository.deleteTreatment(id);
  }

  async getHabits(userId: number) { return this.repository.findHabitsByUserId(userId); }

  async getHabitById(id: string, userId: number) {
    const habit = await this.repository.findHabitById(id, userId);
    if (!habit) throw new NotFoundException("Jadwal habit tidak ditemukan atau Anda tidak memiliki akses");
    return habit;
  }

  async createHabit(userId: number, data: CreateHabitDto) {
    await this.subscriptionService.checkTodoLimit(userId);
    const calculatedReminder = (data as any).pengingat || this.calculateHabitReminder((data as any).jam);
    return this.repository.createHabit(userId, { ...data, pengingat: calculatedReminder });
  }

  async updateHabit(id: string, userId: number, data: UpdateHabitDto) {
    await this.getHabitById(id, userId);
    let calculatedReminder = (data as any).pengingat;
    if ((data as any).jam && !(data as any).pengingat) calculatedReminder = this.calculateHabitReminder((data as any).jam);
    return this.repository.updateHabit(id, { ...data, pengingat: calculatedReminder });
  }

  async deleteHabit(id: string, userId: number) {
    await this.getHabitById(id, userId);
    return this.repository.deleteHabit(id);
  }

  private calculateHabitReminder(jam: string): string {
    const [hourStr, minStr] = jam.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minStr, 10);
    hour = (hour - 1 + 24) % 24;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }
}
