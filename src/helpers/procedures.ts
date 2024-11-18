import { access } from "node:fs/promises";
import { TemplateConfig } from "./scanTemplates";
import { join } from "node:path";
import { isProduction } from "./common";

export const runBeforeCreateHook = async (config: TemplateConfig) => {
  try {
    const ext = isProduction() ? "js" : "mjs";
    const file = join(config.parentPath, config.name, `beforeCreate.${ext}`);
    await access(join(config.parentPath, config.name, `beforeCreate.${ext}`));
    const { default: hook } = await import(file);
    await hook();
  } catch (error) {
    console.error("err", error);
  }
};

export const runAfterCreateHook = async (config: TemplateConfig) => {
  try {
    const ext = isProduction() ? "js" : "mjs";
    const file = join(config.parentPath, config.name, `afterCreate.${ext}`);
    await access(join(config.parentPath, config.name, `afterCreate.${ext}`));
    const { default: hook } = await import(file);
    await hook();
  } catch (error) {
    console.error("err", error);
  }
};
