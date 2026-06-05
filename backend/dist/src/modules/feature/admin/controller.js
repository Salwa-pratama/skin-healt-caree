"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const service_1 = require("./service");
const http_status_codes_1 = require("http-status-codes");
class AdminController {
    constructor() {
        this.getStats = async (req, res) => {
            try {
                const stats = await this.service.getStats();
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil mengambil statistik admin",
                    data: stats,
                });
            }
            catch (error) {
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal mengambil statistik",
                });
            }
        };
        this.getAllUsers = async (req, res) => {
            try {
                const users = await this.service.getAllUsers();
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil mengambil daftar user",
                    data: users,
                });
            }
            catch (error) {
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal mengambil daftar user",
                });
            }
        };
        this.deleteUser = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                        status: "error",
                        message: "ID tidak valid",
                    });
                }
                await this.service.deleteUser(id);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil menghapus user",
                });
            }
            catch (error) {
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal menghapus user",
                });
            }
        };
        this.service = new service_1.AdminService();
    }
}
exports.AdminController = AdminController;
