import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import app from "./app";
import connection from "./models/connection";

dotenv.config();

console.log("Starts connecting with db");

connection().then((conn: Sequelize) => {
  conn.sync({ force: true }).then(() => {
    console.log("sequelize sync successful");
    app.listen(app.get("port"), () => {
      console.log(
        `App is running at http://${process.env.SERVICE_NAME}:${app.get(
          "port"
        )} in mode ${app.get("env")}`
      );
      console.log("  Press CTRL-C to stop\n");
    });
  });
});
