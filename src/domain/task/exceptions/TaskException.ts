import { ControlledException } from "../../shared/exceptions";
import { TaskCreationPayload } from "../contracts/TaskCreationPayload";

export default class TaskException {
  public static taskNotFound = (taskId: number): ControlledException => {
    return {
      message: `Task ${taskId} could not be found`,
      status: 404,
    };
  };
  public static couldNotCreateTask = (
    source: TaskCreationPayload
  ): ControlledException => {
    return {
      message: `Could not create task ${source}, this coud be due a malformed body, please check values`,
      status: 400,
    };
  };
  public static couldNotProcessTaskUpdate = (
    id: string
  ): ControlledException => {
    return {
      message: `Could not process task ${id} resizing notification`,
      status: 400,
    };
  };
  public static couldNotListTasks = (): ControlledException => {
    return {
      message: `Ups! service could not completed the tasks lists, please, contact system administrator`,
      status: 500,
    };
  };
}
