import express, { type Router } from "express";
import multer from "multer";
import { PredictController } from "./controller";

const upload = multer({ storage: multer.memoryStorage() });
const predictController = new PredictController();

export const predictRouter: Router = express.Router();

predictRouter.post(
  "/predict",
  upload.single("file"),
  predictController.predict,
);
