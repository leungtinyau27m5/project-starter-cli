import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { getProjectRoot } from "./common";

type JsonObj = {
  [x: string]: number | string | boolean | JsonObj;
};

export type TemplateConfig = {
  name: string;
  parentPath: string;
  config: JsonObj;
};

export const scanTemplates = async () => {
  const starters = await readdir(join(getProjectRoot(), "starters"), {
    withFileTypes: true,
  }).then((res) => res.filter((r) => r.isDirectory()));

  const configs = await Promise.allSettled(
    starters.map((s) =>
      readFile(join(s.parentPath, s.name, "config.json"), "utf8")
    )
  ).then((res) =>
    res.reduce<TemplateConfig[]>((acc, config, index) => {
      if (config.status === "rejected") return acc;

      acc.push({
        name: starters[index].name,
        parentPath: starters[index].parentPath,
        config: JSON.parse(config.value),
      });

      return acc;
    }, [])
  );

  return configs;
};
