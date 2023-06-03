import { Application, Request, Response } from "express";
import { ApplicationController } from "./contracts";

export default class TaskController implements ApplicationController {
    app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public registerRoutes(): void {
        this.app.get("/task", this.list);
        this.app.get("/task/:id", this.get);
        this.app.post("/task", this.create);
    }

    private async list(req: Request, res: Response): Promise<Response> {
        try {
            // TODO Tasks lister
            return res.send([]);
        } catch (e: any) {
            // To do: should add typo for known exceptions
            res.status(404);
            return res.json({ message: e.message });
        }
    }

    private async get(req: Request, res: Response): Promise<Response> {
        try {
            // TODO Task detailer, should return task resource
            return res.send({});
        } catch (e: any) {
            // To do: should add typo for known exceptions
            res.status(404);
            return res.json({ message: e.message });
        }
    }

    private async create(req: Request, res: Response): Promise<Response> {
        try {
            // TODO Return 202 response, long operation
            return res.send({});
        } catch (e: any) {
            // To do: should add typo for known exceptions
            res.status(e.status || 400);
            return res.send({ message: e.message });
        }
    }
}
