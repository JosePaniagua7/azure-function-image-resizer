import dotenv from "dotenv";

import app from "./app";
import connection from "./models/connection";
import { Sequelize } from "sequelize";

dotenv.config();

console.log("Starts connecting with db");

connection().then((conn: Sequelize) => {
  conn.sync({ force: true }).then(() => {
    console.log("sequelize sync successful");
    app.listen(app.get("port"), () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
    });
  });
})
