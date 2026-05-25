import fs from "fs";
import path from "path";
import { env } from "../../config/env.js";
import { generateSymfonyProject } from "../cli/symfony.js";
import { generateAngularProject } from "../cli/angular.js";
import { generateReactProject } from "../cli/react.js";
import { generateNodeProject } from "../cli/node.js";




export const ProjectsService = {
  async listProjects() {
    const dirs = fs.readdirSync(env.PROJECTS_DIR, { withFileTypes: true });
    return dirs
      .filter((d) => d.isDirectory())
      .map((d) => ({ name: d.name, path: path.join(env.PROJECTS_DIR, d.name) }));
  },

 async createProject({ name, type, domain, description }) {
  switch (type) {
    case "symfony":
      return await generateSymfonyProject(name);

    case "angular":
      return await generateAngularProject(name);

    case "react":
      return await generateReactProject(name);

    case "node":
      return await generateNodeProject(name);

    default:
      throw new Error(`Unknown project type: ${type}`);
  }
}


};
