import { Application, Request, Response } from "express";

import ImageUpdater from "../domain/image/application/ImageUpdater";
import { ControlledException } from "../domain/shared/exceptions";
import TaskUpdater from "../domain/task/application/TaskUpdater";
import { ApplicationController } from "./contracts";

export default class ImageController implements ApplicationController {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public registerRoutes(): void {
    this.app.post("/image/:imageId", this.update);
  }

  private async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedImage = await new ImageUpdater().resizeOperationReceived({
        ...req.body,
        ...req.files,
        id: req.params.imageId,
      });
      console.log(
        "Image update received, will notify task updater use case for proper handle"
      );
      await new TaskUpdater().imageResized(updatedImage.taskId);

      return res.send(updatedImage);
    } catch (e: ControlledException | any) {
      console.warn(
        `The following error ${e} occurred while trying to create task`
      );
      res.status(e.status | 404);
      return res.send({ message: e.message });
    }
  }
}
