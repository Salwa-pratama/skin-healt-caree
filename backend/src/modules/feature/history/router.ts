import express, { type Router } from "express";
import multer from "multer";
import { HistoryController } from "./controller";
import { authMiddleware } from "../../../middleware/auth.middleware";

const upload = multer({ storage: multer.memoryStorage() });
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - jerawat
 *               - predictions
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to be uploaded
 *               jerawat:
 *                 type: string
 *                 description: Top prediction acne type
 *                 example: "Papules"
 *               predictions:
 *                 type: string
 *                 description: JSON string of prediction array
 *                 example: '[{"label":"Papules","persentase":"90%"},{"label":"Cyst","persentase":"5%"}]'
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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
historyRouter.post("/", authMiddleware, upload.single("file"), historyController.saveHistory);

/**
 * @openapi
 * /api/feature/history/{id}:
 *   get:
 *     tags:
 *       - History
 *     summary: Get a specific history record by ID
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
 *         description: Successfully fetched history details
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
 *       404:
 *         description: History not found
 */
historyRouter.get("/:id", authMiddleware, historyController.getHistoryById);

/**
 * @openapi
 * /api/feature/history/{id}:
 *   put:
 *     tags:
 *       - History
 *     summary: Update an existing prediction scan history
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: History ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: New image file to replace the old one (optional)
 *               jerawat:
 *                 type: string
 *                 description: Top prediction acne type (optional)
 *               predictions:
 *                 type: string
 *                 description: JSON string of prediction array (optional)
 *     responses:
 *       200:
 *         description: Successfully updated history
 *       400:
 *         description: Bad request
 *       404:
 *         description: History not found
 *       500:
 *         description: Internal server error
 */
historyRouter.put("/:id", authMiddleware, upload.single("file"), historyController.updateHistory);

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
