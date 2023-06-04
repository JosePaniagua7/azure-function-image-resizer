import "reflect-metadata";
import { Container } from "typedi";

import { TOKENS } from "./domain/shared/constants";
import PostgresqlTaskRepository from "./domain/task/infrastructure/PostgresqlTaskRepository";
import PostgresqlImageRepository from "./domain/image/infrastructure/PostgresqlImageRepository";

Container.set(TOKENS.TASK_REPOSITORY, PostgresqlTaskRepository);
Container.set(TOKENS.IMAGE_REPOSITORY, PostgresqlImageRepository);

export default Container;
