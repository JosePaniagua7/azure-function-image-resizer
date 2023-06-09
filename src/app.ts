import cors from "cors";
import express from "express";
import path from "path";

import { loadApiEndpoints } from "./controllers/api";
import { uploadFiles } from "./middlware/FileUpload.middleware";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploadFiles);
app.use(cors());

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
