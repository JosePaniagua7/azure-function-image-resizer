import { Application, Request, Response } from "express";
import { ApplicationController } from "./contracts";
import TaskCreator from "../domain/task/application/TaskCreator";
import TaskFinder from "../domain/task/application/TaskFinder";
import { ControlledException } from '../domain/shared/exceptions';

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
            console.log('starts retriving list of tasks');
            const tasks = await new TaskFinder().list();
            console.log('Ends retriving list of tasks, will send response');
            return res.send(tasks);
        } catch (e: ControlledException | any) {
            console.warn(`The following error occurred while listing tasks ${e}`);
            res.status(e.status | 404);
            return res.json({ message: e.message });
        }
    }

    private async get(req: Request, res: Response): Promise<Response> {
        try {
            console.log(`Starts retriving task ${req.params.id}`);
            const task = await new TaskFinder().findById(req.params.id);
            console.log(`Ends retriving task ${req.params.id} with response: ${task.toJSON()}`);
            return res.send(task);
        } catch (e: ControlledException | any) {
            console.warn(`The following error ${e} occurred while getting task ${req.params.id}`);
            res.status(e.status | 404);
            return res.json({ message: e.message });
        }
    }

    private async create(req: Request, res: Response): Promise<Response> {
        try {
            console.log(`Starts trying to create task: ${JSON.stringify(req.body)}`);
            const task = await new TaskCreator().create({ ...req.body, ...req.files });
            console.log(`Ends creating task with response: ${task.toJSON()}`);
            return res.send(task);
        } catch (e: ControlledException | any) {
            console.warn(`The following error ${e} occurred while trying to create task ${req.body}`);
            res.status(e.status | 404);
            return res.send({ message: e.message });
        }
    }
}
