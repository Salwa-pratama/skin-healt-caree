"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictController = void 0;
const service_1 = require("./service");
class PredictController {
    constructor(service = new service_1.PredictService()) {
        this.service = service;
        this.predict = async (req, res) => {
            const file = req.file;
            if (!file) {
                res.status(400).json({ success: false, message: "File tidak ditemukan" });
                return;
            }
            const result = await this.service.predictAsync(file.buffer, file.mimetype);
            res.status(result.statusCode).json(result);
        };
    }
}
exports.PredictController = PredictController;
