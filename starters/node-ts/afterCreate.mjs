/** @typedef {import('../../src/helpers/scanTemplates').TemplateConfig} TemplateConfig */

/**
 * @param {TemplateConfig} config
 * @param {Record<string, any>} answers
 */
export default function afterCreate(config, answers) {
  console.log(
    `\nproject ${answers.projectName} is ready with template ${config.name}`
  );
  console.log(`cd ${answers.projectName}`);
  console.log("npm install");
}
