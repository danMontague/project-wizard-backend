import express from "express";
import { ServerService } from "./server.service.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const result = await ServerService.registerProject(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
