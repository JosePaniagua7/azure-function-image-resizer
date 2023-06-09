import "reflect-metadata";

import { Container } from "typedi";

import AzureImageResizer from "./domain/image/application/AzureImageResizer";
import LocalImageResizer from "./domain/image/application/LocalImageResizer";
import PostgresqlImageRepository from "./domain/image/infrastructure/PostgresqlImageRepository";
import { TOKENS } from "./domain/shared/constants";
import PostgresqlTaskRepository from "./domain/task/infrastructure/PostgresqlTaskRepository";

// const isProd = process.env.NODE_ENV === 'production';
const isProd = true;

Container.set(TOKENS.TASK_REPOSITORY, PostgresqlTaskRepository);
Container.set(TOKENS.IMAGE_REPOSITORY, PostgresqlImageRepository);
Container.set(
  TOKENS.IMAGE_RESIZER,
  isProd ? new AzureImageResizer() : new LocalImageResizer()
);
Container.set(
  TOKENS.AZURE_CODE,
  isProd
    ? "HjbLPb0S71628Zzj41OEpDhaMctR0H7EupI1Sosq-x_KAzFuk2Hxrw=="
    : "AZURE_TEST_CODE"
);

export default Container;
