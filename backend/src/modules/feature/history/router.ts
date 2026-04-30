import express, { type Router } from "express";
import { HistoryController } from "./controller";

const historyController = new HistoryController();
export const historyRouter: Router = express.Router();

historyRouter.get("/", historyController.getHistory);
historyRouter.post("/", historyController.saveHistory);
historyRouter.delete("/:id", historyController.deleteHistory);
