import {
    Column,
    Model,
    Table,
} from "sequelize-typescript";
import { TaskRepository } from "../contracts/TaskRepository";

@Table({
    paranoid: true,
    timestamps: true,
    tableName: "Tasks",
    modelName: "PostgresqlTaskRepository"
})
export default class PostgresqlTaskRepository extends Model implements TaskRepository {
    @Column
    status!: string;

    @Column
    resourcePath!: string;

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