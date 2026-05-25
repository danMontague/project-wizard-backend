import fs from "fs";
import path from "path";
import { env } from "../../config/env.js";
import { generateSymfonyProject } from "../cli/symfony.js";
import { generateAngularProject } from "../cli/angular.js";
import { generateReactProject } from "../cli/react.js";
import { generateNodeProject } from "../cli/node.js";
import { GitHubService } from "../github/github.service.js";




export const ProjectsService = {
  async listProjects() {
    const dirs = fs.readdirSync(env.PROJECTS_DIR, { withFileTypes: true });
    return dirs
      .filter((d) => d.isDirectory())
      .map((d) => ({ name: d.name, path: path.join(env.PROJECTS_DIR, d.name) }));
  },

 async createProject({ name, type, domain, description }) {
  let project;

  switch (type) {
    case "symfony":
      project = await generateSymfonyProject(name);
      break;

    case "angular":
      project = await generateAngularProject(name);
      break;

    case "react":
      project = await generateReactProject(name);
      break;

    case "node":
      project = await generateNodeProject(name);
      break;

    default:
      throw new Error(`Unknown project type: ${type}`);
  }

  // 1. Create GitHub repo
const repo = await GitHubService.createRepo(name, true);

if (repo.alreadyExists) {
  console.log("Repo already exists, skipping creation");
}


  // 2. Push local project to GitHub
  await GitHubService.initLocalGit(project.path, repo.ssh_url);

  // 3. Create webhook to your server
  const webhookUrl = `${env.SERVER_API_URL}/webhook`;
  await GitHubService.createWebhook(repo.full_name, webhookUrl);

  return {
    ...project,
    repo: repo.html_url,
    webhook: webhookUrl
  
  } 
 }
 };
