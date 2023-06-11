import PostgresqlImageRepository from "../../image/infrastructure/PostgresqlImageRepository";
import { ImageRepository } from "../contracts/ImageRepository";
import { IMAGE_STATUS } from "../constants";

export const tasksSources = [
    {
        id: '1',
        status: IMAGE_STATUS.RESIZED,
        originalResourcePath: "/uploads/originalResource.jpeg",
        resizedResourcePath: "/output/techincalInterview/800/md5Generated.jpg",
        originalName: "techincalInterview",
        mimeType: "jpg",
        md5: "md5Generated",
        dimension: 800,
        taskId: 1,
    },
    {
        id: '2',
        status: IMAGE_STATUS.RESIZED,
        originalResourcePath: "/uploads/originalResource.jpeg",
        resizedResourcePath: "/output/techincalInterview/1000/md5Generated.jpg",
        originalName: "techincalInterview",
        mimeType: "jpg",
        md5: "md5Generated",
        dimension: 1000,
        taskId: 1,
    }
]

class TestImageRepository implements ImageRepository {
    id: string;
    status: string;
    originalResourcePath: string;
    resizedResourcePath: string;
    originalName: string;
    mimeType: string;
    md5: string;
    dimension: number;
    taskId: number;

    constructor(source: any) {
        this.id = source.id;
        this.status = source.status;
        this.originalResourcePath = source.originalResourcePath;
        this.resizedResourcePath = source.resizedResourcePath;
        this.originalName = source.originalName;
        this.mimeType = source.mimeType;
        this.md5 = source.md5;
        this.dimension = source.dimension;
        this.taskId = source.taskId;
    }
    save = jest.fn((status: string, resourcePath: string): TestImageRepository => {
        return new TestImageRepository({ status, resourcePath });
    });

    create = jest.fn((status: string, resourcePath: string): TestImageRepository => {
        return new TestImageRepository({ status, resourcePath });
    })

    update = jest.fn((source: any): TestImageRepository => {
        return new TestImageRepository(source);
    })

    findByPk = jest.fn((pk: string): TestImageRepository | undefined => {
        const task = tasksSources.find((e) => e.id == pk);
        if (!task)
            return undefined;
        return new TestImageRepository(task);
    })

    findAll = jest.fn((...params: any[]): TestImageRepository[] => {
        return tasksSources.map((e) => new TestImageRepository(e));
    })
}

export default new TestImageRepository({});