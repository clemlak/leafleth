/* eslint-disable no-restricted-syntax */

const fs = require('fs');
const Sqrl = require('squirrelly');
const commander = require('commander');

const program = new commander.Command();

program.version('0.0.1');

program
  .requiredOption('-s, --source <path>', 'compiled smart-contract')
  .option('-o, --output <path>', 'directory output', './docs')
  .option('-t, --template <path>', 'template to use', './templates/template.sqrl');

program.parse(process.argv);

function createDocumentationFor(
  sourcePath,
  outputDir,
  templatePath,
) {
  const file = fs.readFileSync(sourcePath, 'utf8');
  const content = JSON.parse(file);

  const template = fs.readFileSync(templatePath, 'utf8');

  const data = {
    contract: {},
    methods: {},
  };

  data.contract.name = content.contractName;
  data.contract.notice = content.userdoc.notice;
  data.contract.title = content.devdoc.title;
  data.contract.details = content.devdoc.details;
  data.contract.author = content.devdoc.author;

  for (const [key, value] of Object.entries(content.userdoc.methods)) {
    const fragments = key.split('(');
    const methodName = fragments[0];

    data.methods[methodName] = value;
  }

  for (const [key, value] of Object.entries(content.devdoc.methods)) {
    const fragments = key.split('(');
    const methodName = fragments[0];

    data.methods[methodName].details = value.details;
    data.methods[methodName].return = value.return;

    if (value.params) {
      for (const [parameter, description] of Object.entries(value.params)) {
        data.methods[methodName].params = {};
        data.methods[methodName].params[parameter] = {};
        data.methods[methodName].params[parameter].description = description;
      }

      const parametersTypesString = fragments[1].substring(0, fragments[1].length - 1);
      const parametersTypes = parametersTypesString.split(',');

      const parametersKeys = Object.keys(data.methods[methodName].params);

      for (let i = 0; i < parametersKeys.length; i += 1) {
        data.methods[methodName].params[parametersKeys[i]].type = parametersTypes[i];
      }
    }
  }

  console.log(data);

  const result = Sqrl.Render(template, data);

  try {
    fs.accessSync(outputDir);
  } catch (err) {
    fs.mkdirSync(outputDir);
  }

  const outputPath = `${outputDir}/${data.contract.name}.md`;
  fs.writeFileSync(outputPath, result, 'utf8');
}

if (fs.statSync(program.source).isDirectory()) {
  const files = fs.readdirSync(program.source);

  for (let i = 0; i < files.length; i += 1) {
    createDocumentationFor(
      `${program.source}/${files[i]}`,
      program.output,
      program.template,
    );
  }
} else {
  createDocumentationFor(
    program.source,
    program.output,
    program.template,
  );
}
