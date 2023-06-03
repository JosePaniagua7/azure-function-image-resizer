"use strict";
import { Sequelize } from "sequelize-typescript";

import Task from "./Task";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "./../../config/config.json")[env];

const connection = new Sequelize({
  database: config.database,
  dialect: config.dialect,
  username: config.username,
  password: config.password,
  storage: ":memory:",
  logging: false,
  models: [Task],
});

export default connection;
