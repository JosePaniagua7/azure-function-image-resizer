import { TaskRepository } from "../contracts/TaskRepository";
import Container from '../../../dependency.injection';
import { TOKENS } from '../../shared/constants';
import TaskException from "../exceptions/TaskException";
import { TaskCreationPayload } from "../contracts/TaskCreationPayload";
import { ImageCreationPayload } from "../../image/contracts/ImageCreationPayload";
import ImageCreator from "../../image/application/ImageCreator";
import { TASK_STATUS } from "../constants";

export default class TaskCreator {
    repository: TaskRepository;
    constructor() {
        this.repository = Container.get(TOKENS.TASK_REPOSITORY);
    }

    async create(source: TaskCreationPayload) {
        try {
            const task = await this.repository.create({
                ...source,
                status: TASK_STATUS.CREATED,
                resourcePath: source.resource[0].path,
            });
            const imagePayload: ImageCreationPayload = {
                path: task.resourcePath,
                originalName: source.resource[0].originalname,
                mimeType: source.resource[0].mimetype,
                md5: source.resource[0].filename
            }
            await new ImageCreator().create(imagePayload, task.id);
            return task;
        } catch (e) {
            console.warn('Error while calling creat method in repository: ', e);
            throw TaskException.couldNotCreateTask(source);
        }
    }
}