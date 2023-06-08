import { Application } from "express";

import ImageController from "./image.controller";
import TaskController from "./task.controller";

export const loadApiEndpoints = (app: Application): void => {
  new TaskController(app).registerRoutes();
  new ImageController(app).registerRoutes();
};
