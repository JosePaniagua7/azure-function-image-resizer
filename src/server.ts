import dotenv from "dotenv";

import app from "./app";
import connection from "./models/connection";

dotenv.config();

console.log("Starts connecting with db");

connection.sync({ alter: true }).then(() => {
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
