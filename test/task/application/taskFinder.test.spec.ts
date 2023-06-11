import TaskFinder from '../../../src/domain/task/application/TaskFinder';
import { tasksSources } from '../../../src/domain/task/infrastructure/TestTaskRepository';

describe("Test task finder use case", () => {
    it("find by id should return a new instance of task repository", async () => {
        const finder = new TaskFinder();
        const expectedProperties = tasksSources[0];

        const returnedTask = await finder.findById('1');

        expect(returnedTask.id).toBe(expectedProperties.id);
        expect(returnedTask.status).toBe(expectedProperties.status);
        expect(returnedTask.resourcePath).toBe(expectedProperties.resourcePath);
    });


    it("find by id should return a new instance of task repository", async () => {
        const finder = new TaskFinder();

        const tasks = await finder.list();

        expect(tasks.length).toBe(tasksSources.length);
    });
});