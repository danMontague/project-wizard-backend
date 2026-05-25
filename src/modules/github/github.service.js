import axios from "axios";
import { env } from "../../config/env.js";

export const GitHubService = {
  async createRepo(name, isPrivate = true) {
    const res = await axios.post(
      "https://api.github.com/user/repos",
      { name, private: isPrivate },
      { headers: { Authorization: `token ${env.GITHUB_TOKEN}` } }
    );

    return res.data;
  }
};
