import "reflect-metadata";

import { Container } from "typedi";

import AzureImageResizer from "./domain/image/application/AzureImageResizer";
import LocalImageResizer from "./domain/image/application/LocalImageResizer";
import PostgresqlImageRepository from "./domain/image/infrastructure/PostgresqlImageRepository";
import { TOKENS } from "./domain/shared/constants";
import PostgresqlTaskRepository from "./domain/task/infrastructure/PostgresqlTaskRepository";

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
    test: PostgresqlTaskRepository
  },
  {
    id: TOKENS.IMAGE_REPOSITORY,
    development: PostgresqlImageRepository,
    test: PostgresqlImageRepository
  },
  {
    id: TOKENS.IMAGE_RESIZER,
    development: AzureImageResizer,
    test: LocalImageResizer
  }
]

services.forEach((service) => Container.set(service.id, service[env as keyof typeof service]));

export default Container;
