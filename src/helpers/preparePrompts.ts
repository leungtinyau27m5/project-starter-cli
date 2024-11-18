import { DistinctQuestion } from "inquirer";
import { TemplateConfig } from "./scanTemplates";

export type IPrompt = {
  argv: string[];
  inquirer: DistinctQuestion;
};

export const preparePrompts = async (templateConfigs: TemplateConfig[]) => {
  const prompts: IPrompt[] = [
    {
      argv: ["--template", "-n"],
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

    p.inquirer.default = process.argv[idx + 1];

    return p;
  });
};
