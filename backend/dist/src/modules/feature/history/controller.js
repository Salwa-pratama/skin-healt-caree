"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryController = void 0;
const service_1 = require("./service");
class HistoryController {
    constructor(service = new service_1.HistoryService()) {
        this.service = service;
        this.getHistory = async (req, res) => {
            try {
                const userId = req.user?.userId || req.user?.id;
                const history = await this.service.getHistoryAsync(userId);
                res.json({
                    kode: 200,
                    status: "success",
                    data: history
                });
            }
            catch (error) {
                res.status(500).json({ kode: 500, status: "error", message: error.message });
            }
        };
        this.getHistoryById = async (req, res) => {
            try {
                const userId = req.user?.userId || req.user?.id;
                const { id } = req.params;
                const history = await this.service.getHistoryByIdAsync(userId, Number(id));
                if (!history) {
                    res.status(404).json({ kode: 404, status: "error", message: "History tidak ditemukan" });
                    return;
                }
                res.json({
                    kode: 200,
                    status: "success",
                    data: history
                });
            }
            catch (error) {
                res.status(500).json({ kode: 500, status: "error", message: error.message });
            }
        };
        this.saveHistory = async (req, res) => {
            try {
                const file = req.file;
                const userId = req.user.userId || req.user.id;
                const { jerawat, predictions } = req.body;
                if (!file) {
                    res.status(400).json({ kode: 400, status: "error", message: "File gambar tidak ditemukan" });
                    return;
                }
                if (!jerawat || !predictions) {
                    res.status(400).json({ kode: 400, status: "error", message: "Data prediksi (jerawat & predictions) tidak lengkap" });
                    return;
                }
                const saved = await this.service.saveHistoryAsync(file.buffer, userId, jerawat, predictions);
                res.json({
                    kode: 200,
                    status: "success",
                    data: saved
                });
            }
            catch (error) {
                res.status(500).json({ kode: 500, status: "error", message: error.message });
            }
        };
        this.updateHistory = async (req, res) => {
            try {
                const file = req.file;
                const userId = req.user?.userId || req.user?.id;
                const { id } = req.params;
                const { jerawat, predictions } = req.body;
                if (!jerawat && !predictions && !file) {
                    res.status(400).json({ kode: 400, status: "error", message: "Tidak ada data yang diupdate" });
                    return;
                }
                const updated = await this.service.updateHistoryAsync(Number(id), userId, file?.buffer, jerawat, predictions);
                res.json({
                    kode: 200,
                    status: "success",
                    data: updated
                });
            }
            catch (error) {
                if (error.message === "History tidak ditemukan") {
                    res.status(404).json({ kode: 404, status: "error", message: error.message });
                }
                else {
                    res.status(500).json({ kode: 500, status: "error", message: error.message });
                }
            }
        };
        this.deleteHistory = async (req, res) => {
            try {
                const userId = req.user?.userId || req.user?.id;
                const { id } = req.params;
                await this.service.deleteHistoryAsync(userId, Number(id));
                res.json({
                    kode: 200,
                    status: "success",
                    message: "History deleted"
                });
            }
            catch (error) {
                res.status(500).json({ kode: 500, status: "error", message: error.message });
            }
        };
    }
}
exports.HistoryController = HistoryController;
