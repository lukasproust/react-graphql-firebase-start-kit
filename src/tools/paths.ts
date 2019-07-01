import path from "path";
import fs from "fs";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

export const appIndexHtml = resolveApp("public/index.html");
export const appIndexJs = resolveApp("src/index");
export const appNodeModules = resolveApp("node_modules");
export const appBase = "/";
export const appSrc = resolveApp("src");
export const publicFolder = resolveApp("public");
