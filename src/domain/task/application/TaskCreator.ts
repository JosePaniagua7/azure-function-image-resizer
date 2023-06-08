import Container from "../../../dependency.injection";
import ImageCreator from "../../image/application/ImageCreator";
import { ImageCreationPayload } from "../../image/contracts/ImageCreationPayload";
import { TOKENS } from "../../shared/constants";
import { TASK_STATUS } from "../constants";
import { TaskCreationPayload } from "../contracts/TaskCreationPayload";
import { TaskRepository } from "../contracts/TaskRepository";
import TaskException from "../exceptions/TaskException";

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
        md5: source.resource[0].filename,
      };
      await new ImageCreator().create(imagePayload, task.id);
      await task.update({ status: TASK_STATUS.PROCESSING });
      return task;
    } catch (e) {
      console.warn("Error while calling creat method in repository: ", e);
      throw TaskException.couldNotCreateTask(source);
    }
  }
}
