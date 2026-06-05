import express, { Router } from "express";
import { AcneSolutionController } from "./controller";

export const acneSolutionRouter: Router = express.Router();
const controller = new AcneSolutionController();

/**
 * @openapi
 * tags:
 *   name: AcneSolution
 *   description: CRUD for Master Recommendation Data
 */

/**
 * @openapi
 * /api/feature/acne-solution:
 *   get:
 *     tags:
 *       - AcneSolution
 *     summary: Get all master recommendation data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 * 
 *   post:
 *     tags:
 *       - AcneSolution
 *     summary: Create new master recommendation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - description
 *               - goodIngredients
 *               - badIngredients
 *               - habits
 *               - treatments
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Cyst"
 *               description:
 *                 type: string
 *                 example: "Jerawat kecil meradang"
 *               goodIngredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Salicylic Acid", "Benzoyl Peroxide"]
 *               badIngredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Heavy Oils", "Thick cream"]
 *               habits:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Jangan dipencet", "Sabar"]
 *               treatments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     time:
 *                       type: string
 *                 example: [{"name": "Kompres hangat", "time": "Kapan saja"}]
 *     responses:
 *       201:
 *         description: Created
 * 
 * /api/feature/acne-solution/{id}:
 *   get:
 *     tags:
 *       - AcneSolution
 *     summary: Get recommendation by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 * 
 *   put:
 *     tags:
 *       - AcneSolution
 *     summary: Update recommendation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *               goodIngredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               badIngredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               habits:
 *                 type: array
 *                 items:
 *                   type: string
 *               treatments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     time:
 *                       type: string
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 * 
 *   delete:
 *     tags:
 *       - AcneSolution
 *     summary: Delete recommendation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
acneSolutionRouter.get("/", controller.getAllSolutions);
acneSolutionRouter.get("/:id", controller.getSolutionById);
acneSolutionRouter.post("/", controller.createSolution);
acneSolutionRouter.put("/:id", controller.updateSolution);
acneSolutionRouter.delete("/:id", controller.deleteSolution);
