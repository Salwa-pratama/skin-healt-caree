"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const todoRouter = (0, express_1.Router)();
exports.todoRouter = todoRouter;
const controller = new controller_1.TodoController();
/**
 * @openapi
 * tags:
 *   name: ToDo
 *   description: API untuk mengelola jadwal treatment dan jadwal habit perawatan wajah (Feature To-Do)
 */
// ================= JADWAL TREATMENT ENDPOINTS =================
/**
 * @openapi
 * /api/feature/todo/treatment:
 *   get:
 *     summary: Mengambil semua jadwal treatment user yang sedang login
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar jadwal treatment
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
 *                   example: "Berhasil mengambil daftar jadwal treatment"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       hari:
 *                         type: string
 *                         format: date-time
 *                       tempat:
 *                         type: string
 *                       nama:
 *                         type: string
 *                       pengingat:
 *                         type: string
 *                         format: date-time
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
todoRouter.get("/treatment", controller.getTreatments);
/**
 * @openapi
 * /api/feature/todo/treatment/{id}:
 *   get:
 *     summary: Mengambil detail jadwal treatment berdasarkan ID
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID (UUID) dari Jadwal Treatment
 *     responses:
 *       200:
 *         description: Berhasil mengambil detail jadwal treatment
 *       404:
 *         description: Jadwal treatment tidak ditemukan
 */
todoRouter.get("/treatment/:id", controller.getTreatmentById);
/**
 * @openapi
 * /api/feature/todo/treatment:
 *   post:
 *     summary: Membuat jadwal treatment baru
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hari
 *               - tempat
 *               - nama
 *             properties:
 *               hari:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-01T10:00:00.000Z"
 *                 description: Waktu pelaksanaan treatment (DateTime ISO string)
 *               tempat:
 *                 type: string
 *                 example: "Klinik Kecantikan Wijaya"
 *                 description: Tempat pelaksanaan treatment
 *               nama:
 *                 type: string
 *                 example: "Laser Treatment & Facial"
 *                 description: Nama/jenis treatment
 *               pengingat:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-31T10:00:00.000Z"
 *                 description: Tanggal pengingat. Jika tidak dikirimkan, otomatis diset 1 hari sebelum treatment.
 *     responses:
 *       201:
 *         description: Berhasil membuat jadwal treatment baru
 */
todoRouter.post("/treatment", controller.createTreatment);
/**
 * @openapi
 * /api/feature/todo/treatment/{id}:
 *   put:
 *     summary: Memperbarui jadwal treatment
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hari:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-02T10:00:00.000Z"
 *               tempat:
 *                 type: string
 *                 example: "Erha Clinic"
 *               nama:
 *                 type: string
 *                 example: "Chemical Peeling"
 *               pengingat:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-01T10:00:00.000Z"
 *     responses:
 *       200:
 *         description: Berhasil memperbarui jadwal treatment
 *       404:
 *         description: Jadwal treatment tidak ditemukan
 */
todoRouter.put("/treatment/:id", controller.updateTreatment);
/**
 * @openapi
 * /api/feature/todo/treatment/{id}:
 *   delete:
 *     summary: Menghapus jadwal treatment
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Berhasil menghapus jadwal treatment
 *       404:
 *         description: Jadwal treatment tidak ditemukan
 */
todoRouter.delete("/treatment/:id", controller.deleteTreatment);
// ================= JADWAL HABIT ENDPOINTS =================
/**
 * @openapi
 * /api/feature/todo/habit:
 *   get:
 *     summary: Mengambil semua jadwal habit user yang sedang login
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar jadwal habit
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
 *                   example: "Berhasil mengambil daftar jadwal habit"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       nama:
 *                         type: string
 *                       hari:
 *                         type: string
 *                       jam:
 *                         type: string
 *                       pengingat:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
todoRouter.get("/habit", controller.getHabits);
/**
 * @openapi
 * /api/feature/todo/habit/{id}:
 *   get:
 *     summary: Mengambil detail jadwal habit berdasarkan ID
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Berhasil mengambil detail jadwal habit
 *       404:
 *         description: Jadwal habit tidak ditemukan
 */
todoRouter.get("/habit/:id", controller.getHabitById);
/**
 * @openapi
 * /api/feature/todo/habit:
 *   post:
 *     summary: Membuat jadwal habit baru
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - hari
 *               - jam
 *             properties:
 *               nama:
 *                 type: string
 *                 example: "cuci muka"
 *                 description: Nama habit skincare
 *               hari:
 *                 type: string
 *                 example: "senin"
 *                 description: Hari pelaksanaan habit (misal senin, selasa, dll)
 *               jam:
 *                 type: string
 *                 example: "22:00"
 *                 description: Jam pelaksanaan (format HH:MM)
 *               pengingat:
 *                 type: string
 *                 example: "21:00"
 *                 description: Jam pengingat (format HH:MM). Jika tidak dikirimkan, otomatis diset 1 jam sebelum jam pelaksanaan.
 *     responses:
 *       201:
 *         description: Berhasil membuat jadwal habit baru
 */
todoRouter.post("/habit", controller.createHabit);
/**
 * @openapi
 * /api/feature/todo/habit/{id}:
 *   put:
 *     summary: Memperbarui jadwal habit
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 example: "cuci muka pagi"
 *               hari:
 *                 type: string
 *                 example: "selasa"
 *               jam:
 *                 type: string
 *                 example: "07:00"
 *               pengingat:
 *                 type: string
 *                 example: "06:00"
 *     responses:
 *       200:
 *         description: Berhasil memperbarui jadwal habit
 *       404:
 *         description: Jadwal habit tidak ditemukan
 */
todoRouter.put("/habit/:id", controller.updateHabit);
/**
 * @openapi
 * /api/feature/todo/habit/{id}:
 *   delete:
 *     summary: Menghapus jadwal habit
 *     tags: [ToDo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Berhasil menghapus jadwal habit
 *       404:
 *         description: Jadwal habit tidak ditemukan
 */
todoRouter.delete("/habit/:id", controller.deleteHabit);
