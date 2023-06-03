import { Application } from "express";

import TaskController from "./task.controller";

export const loadApiEndpoints = (app: Application): void => {
  new TaskController(app).registerRoutes();
};
