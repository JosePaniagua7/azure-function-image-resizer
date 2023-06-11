import PostgresqlImageRepository from "../../image/infrastructure/PostgresqlImageRepository";
import { TaskRepository } from "../contracts/TaskRepository";
import { TASK_STATUS } from "../constants";

const tasksSources = [
    {
        id: 1,
        createdAt: new Date,
        updatedAtAt: new Date,
        status: TASK_STATUS.PROCESSED,
        resourcePath: '/uploads/resourceTest.jpg'
    },
    {
        id: 2,
        createdAt: new Date,
        updatedAtAt: new Date,
        status: TASK_STATUS.PROCESSED,
        resourcePath: '/uploads/resourceTest1.jpg'
    },
    {
        id: 3,
        createdAt: new Date,
        updatedAtAt: new Date,
        status: TASK_STATUS.PROCESSED,
        resourcePath: '/uploads/resourceTest3.jpg'
    }
]

class TestTaskRepository implements TaskRepository {
    id: number;
    createdAt?: Date;
    updatedAtAt?: Date;
    status!: string;
    resourcePath!: string;
    images?: PostgresqlImageRepository[];

    constructor(source: any) {
        this.id = source.id;
        this.createdAt = new Date();
        this.status = source.status;
        this.resourcePath = source.resourcePath;
    }

    create = jest.fn((status: string, resourcePath: string): TestTaskRepository => {
        return new TestTaskRepository({ status, resourcePath });
    })

    update = jest.fn((source: any): TestTaskRepository => {
        return new TestTaskRepository(source);
    })

    findByPk = jest.fn((pk: number): TestTaskRepository | undefined => {
        const task = tasksSources.find((e) => e.id == pk);
        if (!task)
            return undefined;
        return new TestTaskRepository(task);
    })

    findAll = jest.fn((...params: any[]): TestTaskRepository[] => {
        return tasksSources.map((e) => new TestTaskRepository(e));
    })
}

export default new TestTaskRepository({});