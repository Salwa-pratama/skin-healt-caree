import { Router } from "express";
import { ProfileController } from "./controller";

const profileRouter = Router();
const controller = new ProfileController();

/**
 * @openapi
 * tags:
 *   name: Profile
 *   description: API untuk mengelola profil user (Feature Profile)
 */

/**
 * @openapi
 * /api/feature/profile:
 *   get:
 *     summary: Ambil profil user yang sedang login
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil profil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Profile fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     skintype:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
profileRouter.get("/", controller.getMe);

/**
 * @openapi
 * /api/feature/profile:
 *   put:
 *     summary: Update profil user (Nama & Tipe Kulit)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *                 example: "John Doe" 
 *               skintype: 
 *                 type: string
 *                 example: "oily"
 *                 enum: [normal, dry, oily, combination, sensitive] 
 *     responses:
 *       200:
 *         description: Profil berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     skintype:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
profileRouter.put("/", controller.updateMe);

export { profileRouter };
