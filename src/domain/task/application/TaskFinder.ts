import Container from "../../../dependency.injection";
import { TOKENS } from "../../shared/constants";
import { TaskRepository } from "../contracts/TaskRepository";
import TaskException from "../exceptions/TaskException";

export default class TaskFinder {
  repository: TaskRepository;
  constructor() {
    this.repository = Container.get(TOKENS.TASK_REPOSITORY);
  }

  async findById(id: string) {
    const task = await this.repository.findByPk(id);
    if (!task) throw TaskException.taskNotFound(Number(id));
    return task;
  }

  async list() {
    const tasks = await this.repository.findAll();
    if (!tasks) throw TaskException.couldNotListTasks();
    return tasks;
  }
}
