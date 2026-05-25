import express from "express";
import { ProjectsService } from "./projects.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await ProjectsService.listProjects();
  res.json(projects);
});

router.post("/", async (req, res) => {
  const { name, type, domain, description } = req.body;

  try {
    const result = await ProjectsService.createProject({
      name,
      type,
      domain,
      description
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
