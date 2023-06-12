import TaskUpdater from '../../../src/domain/task/application/TaskUpdater';
import TestTaskRepository from '../../../src/domain/task/infrastructure/TestTaskRepository';
import TaskException from '../../../src/domain/task/exceptions/TaskException';
import Container from '../../../src/dependency.injection';
import { TOKENS } from '../../../src/domain/shared/constants';

describe("Test task updater use case", () => {
    it("Updater should call finder", async () => {
        const updater = new TaskUpdater();
        const finderSpy = jest.spyOn(updater.finder as any, 'findById');

        await updater.imageResized('1');

        expect(finderSpy).toBeCalled();
    });

    it("Updater should capture exception and call couldNotProcessTaskUpdate", async () => {
        const updater = new TaskUpdater();

        updater.finder.findById = jest.fn((id: string): Promise<any> => Promise.resolve({
            id: '1',
            createdAt: '',
            status: 'CREATED',
            resourcePath: 'test',
            $get() {
                throw new Error('Error connecting to db');
            }
        }));

        try {
            await updater.imageResized('1');
            expect(true).toBe(false);
        } catch (e: TaskException | any) {
            expect(e.message).toBe('Could not process task 1 resizing notification');
        }


        // await updater.imageResized('1');

        // expect(async () => {
        //     await updater.imageResized('1');
        // }).toThrowError(TaskException)


        // expect(finderSpy).toBeCalled();
    });



});