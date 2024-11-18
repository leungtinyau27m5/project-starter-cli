#!/usr/bin/env node

import inquirer from "inquirer";
import { join } from "node:path";
import { cp } from "node:fs/promises";
import { scanTemplates } from "./helpers/scanTemplates";
import { preparePrompts } from "./helpers/preparePrompts";
import { isWriteableDir } from "./helpers/common";
import { runAfterCreateHook, runBeforeCreateHook } from "./helpers/procedures";

(async function () {
  const templateConfigs = await scanTemplates();
  const prompts = await preparePrompts(templateConfigs);

  const { projectName, template } = await inquirer.prompt(
    prompts.map((q) => q.inquirer)
  );

  const templateConfig = templateConfigs[template];
  const targetDir = join(process.cwd(), projectName);

  const isWriteable = await isWriteableDir(targetDir, true);
  if (!isWriteable) {
    console.error(`${targetDir} is not empty`);
    process.exit();
  }

  await runBeforeCreateHook(templateConfig);

  await cp(
    join(templateConfig.parentPath, templateConfig.name, "template"),
    targetDir,
    {
      recursive: true,
    }
  );

  await runAfterCreateHook(templateConfig);
})();
