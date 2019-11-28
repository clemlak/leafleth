/* eslint-disable no-restricted-syntax */

const path = require('path');
const fs = require('fs');
const Sqrl = require('squirrelly');
const commander = require('commander');

const program = new commander.Command();

program.version('0.0.5');

const defaultTemplatePath = path.join(__dirname, 'templates', 'default.sqrl');

program
  .requiredOption('-s, --source <path>', 'compiled smart-contract')
  .option('-o, --output <path>', 'directory output', './docs')
  .option('-t, --template <path>', 'template to use', defaultTemplatePath)
  .option('-d, --debug', 'enable debug mode');

program.parse(process.argv);

function createDocumentationFor(
  sourcePath,
  outputDir,
  templatePath,
  debug,
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
  data.contract.networks = content.networks;

  content.abi.forEach((method) => {
    if (method.type !== 'constructor') {
      data.methods[method.name] = {
        constant: method.constant,
        payable: method.payable,
        stateMutability: method.stateMutability,
        type: method.type,
        outputs: method.outputs,
      };
    }
  });

  for (const [key, value] of Object.entries(content.userdoc.methods)) {
    const fragments = key.split('(');
    const methodName = fragments[0];

    data.methods[methodName].notice = value.notice;
  }

  for (const [key, value] of Object.entries(content.devdoc.methods)) {
    const fragments = key.split('(');
    const methodName = fragments[0];

    data.methods[methodName].details = value.details;
    data.methods[methodName].return = value.return;
    data.methods[methodName].author = value.author;

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

  const result = Sqrl.Render(template, data);

  try {
    fs.accessSync(outputDir);
  } catch (err) {
    fs.mkdirSync(outputDir);
  }

  const outputPath = path.format({
    dir: outputDir,
    name: data.contract.name,
    ext: '.md',
  });

  fs.writeFileSync(outputPath, result, 'utf8');

  if (debug) {
    const debugOutputPath = path.format({
      dir: outputDir,
      name: data.contract.name,
      ext: '.debug.json',
    });

    fs.writeFileSync(debugOutputPath, JSON.stringify(data), 'utf8');
  }
}

if (fs.statSync(program.source).isDirectory()) {
  const files = fs.readdirSync(program.source);

  for (let i = 0; i < files.length; i += 1) {
    createDocumentationFor(
      `${program.source}/${files[i]}`,
      program.output,
      program.template,
      program.debug,
    );
  }
} else {
  createDocumentationFor(
    program.source,
    program.output,
    program.template,
    program.debug,
  );
}
