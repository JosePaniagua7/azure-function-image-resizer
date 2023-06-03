import {
    Column,
    Model,
    Table,
} from "sequelize-typescript";

@Table({
    paranoid: true,
    timestamps: true,
})
export default class Task extends Model {
    @Column
    status!: string;

    @Column
    resourcePath!: string;

}
