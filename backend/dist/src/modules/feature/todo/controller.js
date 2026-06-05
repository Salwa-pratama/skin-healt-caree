"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const service_1 = require("./service");
const dto_1 = require("./dto");
const http_status_codes_1 = require("http-status-codes");
class TodoController {
    constructor() {
        // ================= JADWAL TREATMENT =================
        this.getTreatments = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized - User tidak ditemukan dalam token",
                    });
                }
                const treatments = await this.service.getTreatments(Number(userId));
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil mengambil daftar jadwal treatment",
                    data: treatments,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal mengambil daftar jadwal treatment",
                });
            }
        };
        this.getTreatmentById = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                const { id } = req.params;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized",
                    });
                }
                const treatment = await this.service.getTreatmentById(id, Number(userId));
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil mengambil detail jadwal treatment",
                    data: treatment,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal mengambil detail jadwal treatment",
                });
            }
        };
        this.createTreatment = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized",
                    });
                }
                const validatedData = dto_1.createTreatmentSchema.parse(req.body);
                const treatment = await this.service.createTreatment(Number(userId), validatedData);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    status: "success",
                    message: "Berhasil membuat jadwal treatment baru",
                    data: treatment,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    status: "error",
                    message: error.errors ? error.errors.map((e) => e.message).join(", ") : error.message || "Gagal membuat jadwal treatment",
                });
            }
        };
        this.updateTreatment = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                const { id } = req.params;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized",
                    });
                }
                const validatedData = dto_1.updateTreatmentSchema.parse(req.body);
                const updatedTreatment = await this.service.updateTreatment(id, Number(userId), validatedData);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil memperbarui jadwal treatment",
                    data: updatedTreatment,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    status: "error",
                    message: error.errors ? error.errors.map((e) => e.message).join(", ") : error.message || "Gagal memperbarui jadwal treatment",
                });
            }
        };
        this.deleteTreatment = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                const { id } = req.params;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized",
                    });
                }
                await this.service.deleteTreatment(id, Number(userId));
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil menghapus jadwal treatment",
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal menghapus jadwal treatment",
                });
            }
        };
        // ================= JADWAL HABIT =================
        this.getHabits = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized",
                    });
                }
                const habits = await this.service.getHabits(Number(userId));
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil mengambil daftar jadwal habit",
                    data: habits,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal mengambil daftar jadwal habit",
                });
            }
        };
        this.getHabitById = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                const { id } = req.params;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized",
                    });
                }
                const habit = await this.service.getHabitById(id, Number(userId));
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil mengambil detail jadwal habit",
                    data: habit,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal mengambil detail jadwal habit",
                });
            }
        };
        this.createHabit = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized",
                    });
                }
                const validatedData = dto_1.createHabitSchema.parse(req.body);
                const habit = await this.service.createHabit(Number(userId), validatedData);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    status: "success",
                    message: "Berhasil membuat jadwal habit baru",
                    data: habit,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    status: "error",
                    message: error.errors ? error.errors.map((e) => e.message).join(", ") : error.message || "Gagal membuat jadwal habit",
                });
            }
        };
        this.updateHabit = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                const { id } = req.params;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized",
                    });
                }
                const validatedData = dto_1.updateHabitSchema.parse(req.body);
                const updatedHabit = await this.service.updateHabit(id, Number(userId), validatedData);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil memperbarui jadwal habit",
                    data: updatedHabit,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    status: "error",
                    message: error.errors ? error.errors.map((e) => e.message).join(", ") : error.message || "Gagal memperbarui jadwal habit",
                });
            }
        };
        this.deleteHabit = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                const { id } = req.params;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized",
                    });
                }
                await this.service.deleteHabit(id, Number(userId));
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil menghapus jadwal habit",
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal menghapus jadwal habit",
                });
            }
        };
        this.service = new service_1.TodoService();
    }
}
exports.TodoController = TodoController;
