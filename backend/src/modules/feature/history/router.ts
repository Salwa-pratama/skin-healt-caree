import express, { type Router } from "express";
import { HistoryController } from "./controller";

const historyController = new HistoryController();
export const historyRouter: Router = express.Router();

/**
 * @openapi
 * tags:
 *   name: History
 *   description: Feature History API
 */

/**
 * @openapi
 * /api/feature/history:
 *   get:
 *     tags:
 *       - History
 *     summary: Get all history of scan predictions for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kode:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       citra:
 *                         type: string
 *                       name:
 *                         type: string
 *                       predictions:
 *                         type: object
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */
historyRouter.get("/", historyController.getHistory);

/**
 * @openapi
 * /api/feature/history:
 *   post:
 *     tags:
 *       - History
 *     summary: Save a new prediction scan history
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - citra
 *               - name
 *               - predictions
 *             properties:
 *               citra:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               name:
 *                 type: string
 *                 example: "Acne Scan 1"
 *               predictions:
 *                 type: object
 *                 example: {"top_prediction": "Papules", "all_predictions": []}
 *     responses:
 *       200:
 *         description: Successfully saved history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kode:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     citra:
 *                       type: string
 *                     name:
 *                       type: string
 *                     predictions:
 *                       type: object
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 */
historyRouter.post("/", historyController.saveHistory);

/**
 * @openapi
 * /api/feature/history/{id}:
 *   delete:
 *     tags:
 *       - History
 *     summary: Delete a specific history record
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: History ID
 *     responses:
 *       200:
 *         description: History deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kode:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "History deleted"
 */
historyRouter.delete("/:id", historyController.deleteHistory);
