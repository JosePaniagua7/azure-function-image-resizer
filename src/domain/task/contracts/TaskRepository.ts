export interface TaskRepository {
    create: Function;
    update: Function;
    findByPk: Function;
    findAll: Function;
}