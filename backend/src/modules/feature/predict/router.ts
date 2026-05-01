import express, { type Router } from "express";
import multer from "multer";
import { PredictController } from "./controller";

const upload = multer({ storage: multer.memoryStorage() });
const predictController = new PredictController();

export const predictRouter: Router = express.Router();

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
predictRouter.post(
  "/predict",
  upload.single("file"),
  predictController.predict,
);
