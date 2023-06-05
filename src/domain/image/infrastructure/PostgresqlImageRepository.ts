import {
    Column,
    Model,
    Table,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import PostgresqlTaskRepository from "../../task/infrastructure/PostgresqlTaskRepository";

import { ImageRepository } from "../contracts/ImageRepository";

@Table({
    paranoid: true,
    timestamps: true,
    tableName: "Images",
    modelName: "PostgresqlImagekRepository"
})
export default class PostgresqlImageRepository extends Model implements ImageRepository {
    @Column
    status!: string;

    @Column
    originalResourcePath!: string;

    @Column
    resizedResourcePath!: string;

    @Column
    originalName!: string;

    @Column
    mimeType!: string;

    @Column
    md5!: string;

    @Column
    width!: number;

    @Column
    height!: number;

    @ForeignKey(() => PostgresqlTaskRepository)
    @Column
    taskId!: number;

    @BelongsTo(() => PostgresqlTaskRepository)
    task!: PostgresqlTaskRepository;

    create(...params: any[]): Promise<this> {
        return this.create(...params);
    }

    findByPk(...params: any[]): Promise<this> {
        return this.findByPk(...params);
    }

    findAll(...params: any[]): Promise<this> {
        return this.findAll(...params);
    }
}
