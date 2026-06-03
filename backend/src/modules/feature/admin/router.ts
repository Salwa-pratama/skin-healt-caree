import express, { Router } from "express";
import { AdminController } from "./controller";

export const adminRouter: Router = express.Router();
const controller = new AdminController();

/**
 * @openapi
 * tags:
 *   name: Admin
 *   description: Admin Features
 */

adminRouter.get("/stats", controller.getStats);
adminRouter.get("/users", controller.getAllUsers);
adminRouter.delete("/users/:id", controller.deleteUser);
