const path = require('path');
const fs = require('fs');
const commander = require('commander');

const createDocumentationFor = require('./src/documentationGenerator');

const program = new commander.Command();

program.version('0.0.9');

const defaultTemplatePath = path.join(__dirname, 'templates', 'default.sqrl');

program
  .requiredOption('-s, --source <path>', 'compiled smart-contract')
  .option('-o, --output <path>', 'directory output')
  .option('-t, --template <path>', 'template to use', defaultTemplatePath)
  .option('-d, --debug', 'enable debug mode');

program.parse(process.argv);

let outputDir;

if (program.output) {
  outputDir = program.output;
} else if (fs.statSync(program.source).isDirectory()) {
  outputDir = program.source;
} else {
  outputDir = path.dirname(program.source);
}

if (fs.statSync(program.source).isDirectory()) {
  const files = fs.readdirSync(program.source);

  const contracts = files.filter((file) => file.includes('.json'));

  for (let i = 0; i < contracts.length; i += 1) {
    createDocumentationFor(
      `${program.source}/${contracts[i]}`,
      outputDir,
      program.template,
      program.debug,
    );
  }
} else {
  createDocumentationFor(
    program.source,
    outputDir,
    program.template,
    program.debug,
  );
}
