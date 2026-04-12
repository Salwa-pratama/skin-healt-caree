import express, { type Router } from "express";
import multer from "multer";
import { PredictController } from "./controller";

const upload = multer({ storage: multer.memoryStorage() });
const predictController = new PredictController();

export const predictRouter: Router = express.Router();

/**
 * @openapi
 * /api/feature/predict:
 *   post:
 *     tags:
 *       - Feature
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
 */
predictRouter.post(
  "/predict",
  upload.single("file"),
  predictController.predict,
);
