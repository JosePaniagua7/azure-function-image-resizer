import TaskUpdater from '../../../src/domain/task/application/TaskUpdater';


describe("Test task updater use case", () => {
    it("Updater should call finder", async () => {
        const updater = new TaskUpdater();
        const finderSpy = jest.spyOn(updater.finder as any, 'findById');

        await updater.imageResized('1');

        expect(finderSpy).toBeCalled();
    });



});