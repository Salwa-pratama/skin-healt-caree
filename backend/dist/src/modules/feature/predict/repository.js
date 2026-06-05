"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictRepository = void 0;
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importDefault(require("axios"));
const FLASK_URL = process.env.FLASK_URL ?? "http://127.0.0.1:5000";
class PredictRepository {
    async sendToFlaskAsync(fileBuffer, mimetype) {
        const form = new form_data_1.default();
        form.append("file", fileBuffer, {
            filename: "image",
            contentType: mimetype,
        });
        const response = await axios_1.default.post(`${FLASK_URL}/api/predict`, form, {
            headers: form.getHeaders(),
        });
        return {
            jerawat: response.data.data["top_prediction"],
            predictions: response.data.data["all_predictions"],
        };
    }
}
exports.PredictRepository = PredictRepository;
