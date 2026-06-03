"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acneSolutionRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
exports.acneSolutionRouter = express_1.default.Router();
const controller = new controller_1.AcneSolutionController();
/**
 * @openapi
 * tags:
 *   name: AcneSolution
 *   description: CRUD for Master Recommendation Data
 */
exports.acneSolutionRouter.get("/", controller.getAllSolutions);
exports.acneSolutionRouter.get("/:id", controller.getSolutionById);
exports.acneSolutionRouter.post("/", controller.createSolution);
exports.acneSolutionRouter.put("/:id", controller.updateSolution);
exports.acneSolutionRouter.delete("/:id", controller.deleteSolution);
