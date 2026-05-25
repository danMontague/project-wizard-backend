import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  PROJECTS_DIR: process.env.PROJECTS_DIR || "/home/dan/projects",
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  SERVER_API_URL: process.env.SERVER_API_URL // e.g. https://dashboard.ollydev/api/projects/register
};
