import fs from "fs";
import path from "path";
import { env } from "../../config/env.js";

export const ProjectsService = {
  async listProjects() {
    const dirs = fs.readdirSync(env.PROJECTS_DIR, { withFileTypes: true });
    return dirs
      .filter((d) => d.isDirectory())
      .map((d) => ({ name: d.name, path: path.join(env.PROJECTS_DIR, d.name) }));
  },

  async createProject({ name, type, domain, description }) {
    // This will later call CLI generators (ng, symfony, vite, etc.)
    throw new Error("Project creation not implemented yet");
  }
};
