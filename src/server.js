import express from "express";
import cors from "cors";
import { env } from "./config/env.js";

import projectsRouter from "./modules/projects/projects.controller.js";
import githubRouter from "./modules/github/github.controller.js";
import serverRouter from "./modules/server/server.controller.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "project-wizard-backend" });
});

app.use("/api/projects", projectsRouter);
app.use("/api/github", githubRouter);
app.use("/api/server", serverRouter);

app.listen(env.PORT, () => {
  console.log(`Project Wizard backend running on port ${env.PORT}`);
});
