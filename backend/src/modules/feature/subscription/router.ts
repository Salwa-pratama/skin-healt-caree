import express, { type Router } from "express";
import { SubscriptionController } from "./controller";

const controller = new SubscriptionController();
export const subscriptionRouter: Router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Subscription
 *   description: Feature Subscription API untuk mengelola paket dan langganan pengguna
 */

/**
 * @openapi
 * /api/feature/subscriptions:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Mendapatkan semua paket langganan yang tersedia
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar paket langganan
 */
subscriptionRouter.get("/", controller.getPlans);

/**
 * @openapi
 * /api/feature/subscriptions/me:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Mendapatkan data paket aktif dan sisa kuota pengguna saat ini
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil langganan aktif user
 */
subscriptionRouter.get("/me", controller.getMySubscription);

/**
 * @openapi
 * /api/feature/subscriptions/{id}:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Mendapatkan detail paket langganan berdasarkan ID
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
 *         description: Berhasil mengambil detail paket langganan
 *       404:
 *         description: Paket tidak ditemukan
 */
subscriptionRouter.get("/:id", controller.getPlanById);

/**
 * @openapi
 * /api/feature/subscriptions:
 *   post:
 *     tags:
 *       - Subscription
 *     summary: Membuat paket langganan baru
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planName
 *               - model
 *               - maxScansPerMonth
 *               - maxTodoCards
 *               - maxHistorySaved
 *               - price
 *             properties:
 *               planName:
 *                 type: string
 *                 example: "vip"
 *               model:
 *                 type: string
 *                 example: "/api/predict/vip"
 *               maxScansPerMonth:
 *                 type: integer
 *                 example: 100
 *               maxTodoCards:
 *                 type: integer
 *                 example: 100
 *               maxHistorySaved:
 *                 type: integer
 *                 example: 100
 *               price:
 *                 type: integer
 *                 example: 250000
 *     responses:
 *       201:
 *         description: Paket langganan berhasil dibuat
 *       400:
 *         description: Data tidak lengkap atau nama paket sudah digunakan
 */
subscriptionRouter.post("/", controller.createPlan);

/**
 * @openapi
 * /api/feature/subscriptions/subscribe:
 *   post:
 *     tags:
 *       - Subscription
 *     summary: Melakukan transaksi aktivasi atau upgrade paket langganan
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: integer
 *                 description: ID dari paket yang ingin dilanggan
 *                 example: 1
 *               plan_id:
 *                 type: integer
 *                 description: ID dari paket yang ingin dilanggan (snake_case fallback)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Paket langganan berhasil diaktifkan
 */
subscriptionRouter.post("/subscribe", controller.subscribe);

/**
 * @openapi
 * /api/feature/subscriptions/{id}:
 *   put:
 *     tags:
 *       - Subscription
 *     summary: Memperbarui konfigurasi paket langganan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planName:
 *                 type: string
 *               model:
 *                 type: string
 *               maxScansPerMonth:
 *                 type: integer
 *               maxTodoCards:
 *                 type: integer
 *               maxHistorySaved:
 *                 type: integer
 *               price:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Paket langganan berhasil diperbarui
 *       404:
 *         description: Paket tidak ditemukan
 */
subscriptionRouter.put("/:id", controller.updatePlan);

/**
 * @openapi
 * /api/feature/subscriptions/{id}:
 *   delete:
 *     tags:
 *       - Subscription
 *     summary: Menghapus paket langganan dari sistem
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
 *         description: Paket langganan berhasil dihapus
 *       404:
 *         description: Paket tidak ditemukan
 */
subscriptionRouter.delete("/:id", controller.deletePlan);
