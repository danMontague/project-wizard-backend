import fs from "fs";

export const ensureDir = (path) => {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
};
