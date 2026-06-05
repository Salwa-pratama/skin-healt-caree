"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const repository_1 = require("./repository");
const http_status_codes_1 = require("http-status-codes");
class TodoService {
    constructor() {
        this.repository = new repository_1.TodoRepository();
    }
    // ================= JADWAL TREATMENT =================
    async getTreatments(userId) {
        return await this.repository.findTreatmentsByUserId(userId);
    }
    async getTreatmentById(id, userId) {
        const treatment = await this.repository.findTreatmentById(id, userId);
        if (!treatment) {
            throw {
                status: http_status_codes_1.StatusCodes.NOT_FOUND,
                message: "Jadwal treatment tidak ditemukan atau Anda tidak memiliki akses",
            };
        }
        return treatment;
    }
    async createTreatment(userId, data) {
        // Otomatis hitung pengingat = 1 hari sebelum hari treatment jika tidak disediakan
        const calculatedReminder = data.pengingat || new Date(new Date(data.hari).getTime() - 24 * 60 * 60 * 1000).toISOString();
        return await this.repository.createTreatment(userId, {
            ...data,
            pengingat: calculatedReminder,
        });
    }
    async updateTreatment(id, userId, data) {
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
    async deleteTreatment(id, userId) {
        // Verifikasi kepemilikan
        await this.getTreatmentById(id, userId);
        return await this.repository.deleteTreatment(id);
    }
    // ================= JADWAL HABIT =================
    async getHabits(userId) {
        return await this.repository.findHabitsByUserId(userId);
    }
    async getHabitById(id, userId) {
        const habit = await this.repository.findHabitById(id, userId);
        if (!habit) {
            throw {
                status: http_status_codes_1.StatusCodes.NOT_FOUND,
                message: "Jadwal habit tidak ditemukan atau Anda tidak memiliki akses",
            };
        }
        return habit;
    }
    async createHabit(userId, data) {
        // Otomatis hitung pengingat = 1 jam sebelum jam pelaksanaan jika tidak disediakan
        const calculatedReminder = data.pengingat || this.calculateHabitReminder(data.jam);
        return await this.repository.createHabit(userId, {
            ...data,
            pengingat: calculatedReminder,
        });
    }
    async updateHabit(id, userId, data) {
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
    async deleteHabit(id, userId) {
        // Verifikasi kepemilikan
        await this.getHabitById(id, userId);
        return await this.repository.deleteHabit(id);
    }
    /**
     * Menghitung pengingat 1 jam sebelum jam pelaksanaan
     * Contoh: "22:00" -> "21:00", "00:30" -> "23:30"
     */
    calculateHabitReminder(jam) {
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
exports.TodoService = TodoService;
