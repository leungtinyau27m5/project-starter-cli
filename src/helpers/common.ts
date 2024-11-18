import { access, mkdir, readdir } from "node:fs/promises";
import { dirname } from "node:path";

export const isProduction = () => process.env.NODE_ENV !== "development";

export const getProjectRoot = () =>
  isProduction() ? dirname(process.argv[1]) : process.cwd();

export const isWriteableDir = async (
  dir: string,
  createIfNotExists = false
) => {
  try {
    await access(dir);
  } catch {
    if (createIfNotExists) await mkdir(dir);
    return true;
  }

  const res = await readdir(dir);
  return res.length === 0;
};
