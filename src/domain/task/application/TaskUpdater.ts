import { TaskRepository } from "../contracts/TaskRepository";
import Container from '../../../dependency.injection';
import { TOKENS } from '../../shared/constants';
import TaskException from "../exceptions/TaskException";
import TaskFinder from "./TaskFinder";
import PostgresqlImageRepository from "../../image/infrastructure/PostgresqlImageRepository";
import { IMAGE_STATUS } from "../../image/constants";
import { TASK_STATUS } from "../constants";

export default class TaskUpdater {
    repository: TaskRepository;
    constructor() {
        this.repository = Container.get(TOKENS.TASK_REPOSITORY);
    }

    async imageResized(id: string) {
        const task = await new TaskFinder().findById(id);
        try {
            const taskImages = await task.$get('images');
            const missingDimensions = taskImages
                .filter((image: PostgresqlImageRepository) => image.status !== IMAGE_STATUS.RESIZED)
                .map((image: PostgresqlImageRepository) => image.dimension)

            if (missingDimensions.length) {
                console.log(`The following dimensions ${missingDimensions}  are still processing, won't cause any status change in task`);
                return;
            }

            console.log('All dimensions appear to be processed, task can be closed');
            await task.update({ status: TASK_STATUS.PROCESSED });

        } catch (e) {
            console.warn('Error while reciving resize operation notification: ', e);
            throw TaskException.couldNotProcessTaskUpdate(id);
        }
    }
}