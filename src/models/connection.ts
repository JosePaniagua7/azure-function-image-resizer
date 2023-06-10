"use strict";
import pg, { Client } from "pg";
import { Sequelize } from "sequelize-typescript";

import Image from "../domain/image/infrastructure/PostgresqlImageRepository";
import Task from "../domain/task/infrastructure/PostgresqlTaskRepository";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "./../../config/config.json")[env];

const createConnection = async () => {
  const { username, password, host, database } = config;
  const connectionString = `postgresql://${username}:${password}@${host}:5432`;
  console.log("starts creating db if not exists");
  const client = new Client({ connectionString });
  await client.connect();
  const query = `SELECT 'CREATE DATABASE ${database}' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${database}')`;
  await client.query(query);
  console.log("database should exist in db server");
  console.log("Starts connecting to our database");

  return new Sequelize({
    host,
    database: config.database,
    dialect: config.dialect,
    username: config.username,
    password: config.password,
    storage: ":memory:",
    logging: false,
    models: [Task, Image],
  });
};
export default createConnection;
