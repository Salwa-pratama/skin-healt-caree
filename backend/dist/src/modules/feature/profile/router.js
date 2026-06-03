"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const controller_1 = require("./controller");
const profileRouter = (0, express_1.Router)();
exports.profileRouter = profileRouter;
const controller = new controller_1.ProfileController();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
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
 *                     phone:
 *                       type: string
 *                       nullable: true
 *                     gambar:
 *                       type: string
 *                       nullable: true
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
 *     summary: Update profil user (Nama, Tipe Kulit, Telepon & Foto Profil)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *               phone:
 *                 type: string
 *                 example: "081234567890"
 *               gambar:
 *                 type: string
 *                 format: binary
 *                 description: File foto profil yang diunggah dari komputer
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
 *                     phone:
 *                       type: string
 *                       nullable: true
 *                     gambar:
 *                       type: string
 *                       nullable: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
profileRouter.put("/", upload.single("gambar"), controller.updateMe);
