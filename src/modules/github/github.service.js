import axios from "axios";
import { execAsync } from "../../../utils/exec.js";
import { env } from "../../config/env.js";
import path from "path";

export const GitHubService = {
  async createRepo(name, isPrivate = true) {
    try {
    const res = await axios.post(
      "https://api.github.com/user/repos",
      { name, private: isPrivate },
      { headers: { Authorization: `token ${env.GITHUB_TOKEN}` } }
    );

    return res.data;
  } catch (err) {
    // If repo already exists, GitHub returns 422
    if (err.response && err.response.status === 422) {
      return { alreadyExists: true };
    }

    throw err;
  }
  },

  async initLocalGit(projectPath, repoUrl) {
    await execAsync(`git init`, { cwd: projectPath });
    await execAsync(`git add .`, { cwd: projectPath });
    await execAsync(`git commit -m "Initial commit"`, { cwd: projectPath });
    await execAsync(`git branch -M main`, { cwd: projectPath });
    await execAsync(`git remote add origin ${repoUrl}`, { cwd: projectPath });
    await execAsync(`git push -u origin main`, { cwd: projectPath });

    return true;
  },

  async createWebhook(repoFullName, webhookUrl) {
    const res = await axios.post(
      `https://api.github.com/repos/${repoFullName}/hooks`,
      {
        name: "web",
        active: true,
        events: ["push"],
        config: {
          url: webhookUrl,
          content_type: "json",
          insecure_ssl: "0"
        }
      },
      { headers: { Authorization: `token ${env.GITHUB_TOKEN}` } }
    );

    return res.data;
  }
};
