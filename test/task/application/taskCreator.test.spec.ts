import TaskCraetor from '../../../src/domain/task/application/TaskCreator';
import { tasksSources } from '../../../src/domain/task/infrastructure/TestTaskRepository';

describe("Test task creator use case", () => {
    it("find by id should return a new instance of task repository", async () => {
        const creator = new TaskCraetor();
        const createSpy = jest.spyOn(creator.repository as any, 'create');
        const updateSpy = jest.spyOn(creator.repository as any, 'update');
        const expectedProperties = tasksSources[0];

        const returnedTask = await creator.create({
            status: expectedProperties.status,
            resourcePath: expectedProperties.resourcePath,
            resource: [{
                originalname: 'test',
                mimetype: 'jpg',
                filename: 'technicalInterview',
                fieldname: 'resource',
                encoding: 'md5',
                destination: 'output',
                path: './test/resources/technicalInterviewInput.jpeg',
                size: 20,
            }],
        });

        console.log('returned task  ', returnedTask);
        expect(createSpy).toBeCalled();
    });
});