"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcneSolutionController = void 0;
const service_1 = require("./service");
const dto_1 = require("./dto");
const http_status_codes_1 = require("http-status-codes");
class AcneSolutionController {
    constructor() {
        this.getAllSolutions = async (req, res) => {
            try {
                const solutions = await this.service.getAllSolutions();
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil mengambil data master rekomendasi",
                    data: solutions,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal mengambil data rekomendasi",
                });
            }
        };
        this.getSolutionById = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                        status: "error",
                        message: "ID tidak valid",
                    });
                }
                const solution = await this.service.getSolutionById(id);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil mengambil detail rekomendasi",
                    data: solution,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal mengambil detail rekomendasi",
                });
            }
        };
        this.createSolution = async (req, res) => {
            try {
                const validatedData = dto_1.createAcneSolutionSchema.parse(req.body);
                const solution = await this.service.createSolution(validatedData);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    status: "success",
                    message: "Berhasil membuat master rekomendasi baru",
                    data: solution,
                });
            }
            catch (error) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    status: "error",
                    message: error.errors ? error.errors.map((e) => e.message).join(", ") : error.message || "Gagal membuat rekomendasi",
                });
            }
        };
        this.updateSolution = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                        status: "error",
                        message: "ID tidak valid",
                    });
                }
                const validatedData = dto_1.updateAcneSolutionSchema.parse(req.body);
                const updatedSolution = await this.service.updateSolution(id, validatedData);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil memperbarui rekomendasi",
                    data: updatedSolution,
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    status: "error",
                    message: error.errors ? error.errors.map((e) => e.message).join(", ") : error.message || "Gagal memperbarui rekomendasi",
                });
            }
        };
        this.deleteSolution = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                        status: "error",
                        message: "ID tidak valid",
                    });
                }
                await this.service.deleteSolution(id);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Berhasil menghapus rekomendasi",
                });
            }
            catch (error) {
                return res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "error",
                    message: error.message || "Gagal menghapus rekomendasi",
                });
            }
        };
        this.service = new service_1.AcneSolutionService();
    }
}
exports.AcneSolutionController = AcneSolutionController;
