import path from "path";
import fs from "fs";
import { execAsync } from "../../../utils/exec.js";
import { env } from "../../config/env.js";

export async function generateSymfonyProject(name) {
  const projectPath = path.join(env.PROJECTS_DIR, name);

  if (fs.existsSync(projectPath)) {
    throw new Error(`Project '${name}' already exists`);
  }

  // 1. Create Symfony project
  await execAsync(`symfony new ${name} --webapp`, {
    cwd: env.PROJECTS_DIR
  });

  // 2. Install common bundles
  await execAsync(`composer require symfony/maker-bundle --dev`, {
    cwd: projectPath
  });

  await execAsync(`composer require symfony/security-bundle`, {
    cwd: projectPath
  });

  await execAsync(`composer require symfony/orm-pack`, {
    cwd: projectPath
  });

  // 3. Fix permissions (Fedora SELinux)
  try {
    await execAsync(`chcon -R -t httpd_sys_rw_content_t ${projectPath}`);
  } catch {
    // Non‑fatal — SELinux may not be enforcing
  }

  return {
    name,
    path: projectPath,
    type: "symfony",
    createdAt: new Date().toISOString()
  };
}
