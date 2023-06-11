import "reflect-metadata";

import { Container } from "typedi";

import AzureImageResizer from "./domain/image/application/AzureImageResizer";
import LocalImageResizer from "./domain/image/application/LocalImageResizer";
import PostgresqlImageRepository from "./domain/image/infrastructure/PostgresqlImageRepository";
import TestImageRepository from "./domain/image/infrastructure/TestImageRepository";
import { TOKENS } from "./domain/shared/constants";
import PostgresqlTaskRepository from "./domain/task/infrastructure/PostgresqlTaskRepository";
import TestTaskRepository from "./domain/task/infrastructure/TestTaskRepository";

const env = process.env.NODE_ENV || 'development';

interface Dependency {
  id: string;
  development: any;
  test: any;
}
const services: Dependency[] = [
  {
    id: TOKENS.TASK_REPOSITORY,
    development: PostgresqlTaskRepository,
    test: TestTaskRepository
  },
  {
    id: TOKENS.IMAGE_REPOSITORY,
    development: PostgresqlImageRepository,
    test: TestImageRepository
  },
  {
    id: TOKENS.IMAGE_RESIZER,
    development: AzureImageResizer,
    test: LocalImageResizer
  }
]

services.forEach((service) => Container.set(service.id, service[env as keyof typeof service]));

export default Container;
