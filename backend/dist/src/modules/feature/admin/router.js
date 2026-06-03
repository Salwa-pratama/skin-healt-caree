"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
exports.adminRouter = express_1.default.Router();
const controller = new controller_1.AdminController();
/**
 * @openapi
 * tags:
 *   name: Admin
 *   description: Admin Features
 */
exports.adminRouter.get("/stats", controller.getStats);
exports.adminRouter.get("/users", controller.getAllUsers);
exports.adminRouter.delete("/users/:id", controller.deleteUser);
