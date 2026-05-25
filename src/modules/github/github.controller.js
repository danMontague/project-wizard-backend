import express from "express";
import { GitHubService } from "./github.service.js";

const router = express.Router();

router.post("/create-repo", async (req, res) => {
  const { name, privateRepo } = req.body;

  try {
    const repo = await GitHubService.createRepo(name, privateRepo);
    res.json(repo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
