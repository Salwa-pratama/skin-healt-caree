import { Router } from "express";
import { ProfileController } from "./controller";

const profileRouter = Router();
const controller = new ProfileController();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API untuk mengelola profil user (Feature Profile)
 */

/**
 * @swagger
 * /api/feature/profile:
 *   get:
 *     summary: Ambil profil user yang sedang login
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil profil
 */
profileRouter.get("/", controller.getMe);

/**
 * @swagger
 * /api/feature/profile:
 *   put:
 *     summary: Update profil user (Nama & Tipe Kulit)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "John Doe" }
 *               skintype: { type: string, example: "oily", enum: [normal, dry, oily, combination, sensitive] }
 *     responses:
 *       200:
 *         description: Profil berhasil diupdate
 */
profileRouter.put("/", controller.updateMe);

export { profileRouter };
