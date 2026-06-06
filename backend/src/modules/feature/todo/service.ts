import { TodoRepository } from "./repository";
import { CreateTreatmentDTO, UpdateTreatmentDTO, CreateHabitDTO, UpdateHabitDTO } from "./dto";
import { StatusCodes } from "http-status-codes";
import { SubscriptionService } from "../subscription/service";

export class TodoService {
  private repository: TodoRepository;
  private subscriptionService: SubscriptionService;

  constructor() {
    this.repository = new TodoRepository();
    this.subscriptionService = new SubscriptionService();
  }

  // ================= JADWAL TREATMENT =================

  async getTreatments(userId: number) {
    return await this.repository.findTreatmentsByUserId(userId);
  }

  async getTreatmentById(id: string, userId: number) {
    const treatment = await this.repository.findTreatmentById(id, userId);
    if (!treatment) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: "Jadwal treatment tidak ditemukan atau Anda tidak memiliki akses",
      };
    }
    return treatment;
  }

  async createTreatment(userId: number, data: CreateTreatmentDTO) {
    // Check subscription todo card limit
    await this.subscriptionService.checkTodoLimit(userId);

    // Otomatis hitung pengingat = 1 hari sebelum hari treatment jika tidak disediakan
    const calculatedReminder = data.pengingat || new Date(new Date(data.hari).getTime() - 24 * 60 * 60 * 1000).toISOString();

    return await this.repository.createTreatment(userId, {
      ...data,
      pengingat: calculatedReminder,
    });
  }

  async updateTreatment(id: string, userId: number, data: UpdateTreatmentDTO) {
    // Verifikasi kepemilikan
    await this.getTreatmentById(id, userId);

    // Jika hari dirubah namun pengingat tidak dikirimkan, recalculate pengingat 1 hari sebelumnya
    let calculatedReminder = data.pengingat;
    if (data.hari && !data.pengingat) {
      calculatedReminder = new Date(new Date(data.hari).getTime() - 24 * 60 * 60 * 1000).toISOString();
    }

    return await this.repository.updateTreatment(id, {
      ...data,
      pengingat: calculatedReminder,
    });
  }

  async deleteTreatment(id: string, userId: number) {
    // Verifikasi kepemilikan
    await this.getTreatmentById(id, userId);
    return await this.repository.deleteTreatment(id);
  }

  // ================= JADWAL HABIT =================

  async getHabits(userId: number) {
    return await this.repository.findHabitsByUserId(userId);
  }

  async getHabitById(id: string, userId: number) {
    const habit = await this.repository.findHabitById(id, userId);
    if (!habit) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: "Jadwal habit tidak ditemukan atau Anda tidak memiliki akses",
      };
    }
    return habit;
  }

  async createHabit(userId: number, data: CreateHabitDTO) {
    // Check subscription todo card limit
    await this.subscriptionService.checkTodoLimit(userId);

    // Otomatis hitung pengingat = 1 jam sebelum jam pelaksanaan jika tidak disediakan
    const calculatedReminder = data.pengingat || this.calculateHabitReminder(data.jam);

    return await this.repository.createHabit(userId, {
      ...data,
      pengingat: calculatedReminder,
    });
  }

  async updateHabit(id: string, userId: number, data: UpdateHabitDTO) {
    // Verifikasi kepemilikan
    await this.getHabitById(id, userId);

    // Jika jam dirubah namun pengingat tidak dikirimkan, recalculate pengingat 1 jam sebelumnya
    let calculatedReminder = data.pengingat;
    if (data.jam && !data.pengingat) {
      calculatedReminder = this.calculateHabitReminder(data.jam);
    }

    return await this.repository.updateHabit(id, {
      ...data,
      pengingat: calculatedReminder,
    });
  }

  async deleteHabit(id: string, userId: number) {
    // Verifikasi kepemilikan
    await this.getHabitById(id, userId);
    return await this.repository.deleteHabit(id);
  }

  /**
   * Menghitung pengingat 1 jam sebelum jam pelaksanaan
   * Contoh: "22:00" -> "21:00", "00:30" -> "23:30"
   */
  private calculateHabitReminder(jam: string): string {
    const [hourStr, minStr] = jam.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minStr, 10);

    // Kurang 1 jam (dengan overflow 24 jam)
    hour = (hour - 1 + 24) % 24;

    const formattedHour = String(hour).padStart(2, "0");
    const formattedMinute = String(minute).padStart(2, "0");

    return `${formattedHour}:${formattedMinute}`;
  }
}
