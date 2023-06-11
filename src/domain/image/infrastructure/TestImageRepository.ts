import PostgresqlImageRepository from "../../image/infrastructure/PostgresqlImageRepository";
import { ImageRepository } from "../contracts/ImageRepository";
import { IMAGE_STATUS } from "../constants";

export const imagesSources = [
    {
        id: '1',
        status: IMAGE_STATUS.RESIZED,
        originalResourcePath: './test/resources/technicalInterviewInput.jpeg',
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
        originalResourcePath: './test/resources/technicalInterviewInput.jpeg',
        resizedResourcePath: "/output/techincalInterview/1000/md5Generated.jpg",
        originalName: "techincalInterview",
        mimeType: "jpg",
        md5: "md5Generated",
        dimension: 1000,
        taskId: 1,
    }
]

export class TestImageRepository implements ImageRepository {
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
    save(): TestImageRepository {
        return this;
    };

    create(source: any): TestImageRepository {
        return new TestImageRepository(source);
    }

    update(source: any): TestImageRepository {
        return new TestImageRepository(source);
    }

    findByPk(pk: string): TestImageRepository | undefined {
        const task = imagesSources.find((e) => e.id == pk);
        if (!task)
            return undefined;
        return new TestImageRepository(task);
    }

    findAll(...params: any[]): TestImageRepository[] {
        return imagesSources.map((e) => new TestImageRepository(e));
    }
}

export default new TestImageRepository({});