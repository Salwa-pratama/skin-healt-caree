"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controller_1 = require("./controller");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const predictController = new controller_1.PredictController();
exports.predictRouter = express_1.default.Router();
/**
 * @openapi
 * tags:
 *   name: Predict
 *   description: Feature Predict API
 */
/**
 * @openapi
 * /api/feature/predict:
 *   post:
 *     tags:
 *       - Predict
 *     summary: Predict skin condition from image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Prediction successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prediksi berhasil"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     jerawat:
 *                       type: string
 *                       example: "Papules"
 *                     predictions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                             example: "Papules"
 *                           persentase:
 *                             type: string
 *                             example: "95.20%"
 *       500:
 *         description: An error occurred while predicting
 */
exports.predictRouter.post("/predict", upload.single("file"), predictController.predict);
