import { Application, Request, Response } from "express";
import { ApplicationController } from "./contracts";
import { ControlledException } from '../domain/shared/exceptions';
import ImageUpdater from "../domain/image/application/ImageUpdater";

export default class TaskController implements ApplicationController {
    app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public registerRoutes(): void {
        this.app.post("/task/:taskId/image/:imageId", this.update);
    }

    private async update(req: Request, res: Response): Promise<Response> {
        try {
            console.log(`Starts updating image: ${req.params.imageId} that belongs to task ${req.params.taskId}`);
            const updatedImage = new ImageUpdater().resizeOperationReceived({ ...req.body, ...req.files });
            console.log('Image update received, will notify task updater use case for proper handle');

            return res.send(updatedImage);
        } catch (e: ControlledException | any) {
            console.warn(`The following error ${e} occurred while trying to create task ${req.body}`);
            res.status(e.status | 404);
            return res.send({ message: e.message });
        }
    }
}
