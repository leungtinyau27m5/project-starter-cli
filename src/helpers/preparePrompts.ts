import { DistinctQuestion } from "inquirer";
import { TemplateConfig } from "./scanTemplates";

export type IPrompt = {
  argv: string[];
  inquirer: DistinctQuestion;
  converter?: (value: string) => unknown;
};

export const preparePrompts = async (templateConfigs: TemplateConfig[]) => {
  const prompts: IPrompt[] = [
    {
      argv: ["--template", "-n"],
      converter: (v) => {
        const idx = templateConfigs.findIndex((t) => t.name === v);
        if (idx !== -1) return idx;
        return 0;
      },
      inquirer: {
        name: "template",
        type: "list",
        default: 0,
        message: "Which template you want?",
        choices: templateConfigs.map((t, index) => ({
          name: t.name,
          value: index,
        })),
      },
    },
    {
      argv: ["--name", "-n"],
      inquirer: {
        name: "projectName",
        type: "input",
        default: ".",
        message: "What is the project name?",
      },
    },
  ];

  return prompts.map((p) => {
    if (p.argv.length === 0) return p;

    const idx = process.argv.findIndex((a) => p.argv.includes(a));
    if (idx === -1) return p;

    p.inquirer.default = p.converter
      ? p.converter(process.argv[idx + 1])
      : process.argv[idx + 1];

    return p;
  });
};
