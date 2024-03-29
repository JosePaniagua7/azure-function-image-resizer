import Container from "../../../dependency.injection";
import { IMAGE_STATUS } from "../../image/constants";
import PostgresqlImageRepository from "../../image/infrastructure/PostgresqlImageRepository";
import { TOKENS } from "../../shared/constants";
import { TASK_STATUS } from "../constants";
import { TaskRepository } from "../contracts/TaskRepository";
import TaskException from "../exceptions/TaskException";
import TaskFinder from "./TaskFinder";

export default class TaskUpdater {
  repository: TaskRepository;
  finder: TaskFinder;
  constructor() {
    this.repository = Container.get(TOKENS.TASK_REPOSITORY);
    this.finder = new TaskFinder();
  }

  async imageResized(id: string) {
    const task = await this.finder.findById(id);
    try {
      const taskImages = await task.$get("images");
      const missingDimensions = taskImages
        .filter(
          (image: PostgresqlImageRepository) =>
            image.status !== IMAGE_STATUS.RESIZED
        )
        .map((image: PostgresqlImageRepository) => image.dimension);

      if (missingDimensions.length) {
        console.log(
          `The following dimensions ${missingDimensions}  are still processing, won't cause any status change in task`
        );
        return;
      }

      console.log("All dimensions appear to be processed, task can be closed");
      await task.update({ status: TASK_STATUS.PROCESSED });
    } catch (e) {
      console.warn("Error while reciving resize operation notification: ", e);
      throw TaskException.couldNotProcessTaskUpdate(id);
    }
  }
}
