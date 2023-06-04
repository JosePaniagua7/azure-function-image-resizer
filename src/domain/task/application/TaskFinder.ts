
import { TaskRepository } from "../contracts/TaskRepository";
import Container from '../../../dependency.injection';
import { TOKENS } from '../../shared/constants';
import TaskException from "../exceptions/TaskException";

export default class TaskFinder {
    repository: TaskRepository;
    constructor() {
        this.repository = Container.get(TOKENS.TASK_REPOSITORY);
    }

    async findById(id: number) {
        const task = await this.repository.findByPk(id);
        if (!task) throw TaskException.taskNotFound(id);
        return task;
    }

    async list() {
        const tasks = await this.repository.findAll();
        if (!tasks) throw TaskException.couldNotListTasks();
        return tasks;
    }
}