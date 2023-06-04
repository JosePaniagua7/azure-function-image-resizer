import { TaskRepository } from "../contracts/TaskRepository";
import Container from '../../../dependency.injection';
import { TOKENS } from '../../shared/constants';
import TaskException from "../exceptions/TaskException";
import { TaskCreationPayload } from "../contracts/TaskCreationPayload";


export default class TaskCreator {
    repository: TaskRepository;
    constructor() {
        this.repository = Container.get(TOKENS.TASK_REPOSITORY);
    }

    async create(source: TaskCreationPayload) {
        try {
            const task = await this.repository.create({ ...source, status: 'created' });
            return task;
        } catch (e) {
            console.warn('Error while calling creat method in repository: ', e);
            throw TaskException.couldNotCreateTask(source);
        }
    }
}