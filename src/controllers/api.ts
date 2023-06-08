import { Application } from "express";

import TaskController from "./task.controller";
import ImageController from "./image.controller";

export const loadApiEndpoints = (app: Application): void => {
  new TaskController(app).registerRoutes();
  new ImageController(app).registerRoutes();
};
