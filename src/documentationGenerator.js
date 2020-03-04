/* eslint-disable no-restricted-syntax */

const fs = require('fs');
const path = require('path');
const Sqrl = require('squirrelly');

function signatureFromABI(method) {
  const types = method.inputs.map(x => x.type);
  const packed = types.join();
  return method.name+"("+packed+")";
}

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
    events: {},
  };

  data.contract.name = content.contractName;
  data.contract.notice = content.userdoc.notice;
  data.contract.title = content.devdoc.title;
  data.contract.details = content.devdoc.details;
  data.contract.author = content.devdoc.author;
  data.contract.networks = content.networks;

  content.abi.forEach((method) => {
    if (
      method.type === 'function'
    ) {
      data.methods[method.name] = {
        constant: method.constant,
        payable: method.payable,
        stateMutability: method.stateMutability,
        outputs: method.outputs,
        signature: signatureFromABI(method)
      };
    }
  });

  content.abi.forEach((event) => {
    if (
      event.type === 'event'
    ) {
      data.events[event.name] = {
        inputs: event.inputs,
        anonymous: event.anonymous,
      };
    }
  });

  for (const [key, value] of Object.entries(content.userdoc.methods)) {
    if (key !== 'constructor') {
      const fragments = key.split('(');
      const methodName = fragments[0];
      data.methods[methodName].notice = value.notice;
    }
  }

  for (const [key, value] of Object.entries(content.devdoc.methods)) {
    if (key !== 'constructor') {
      const fragments = key.split('(');
      const methodName = fragments[0];

      data.methods[methodName].details = value.details;
      data.methods[methodName].return = value.return;
      //from solidity 0.6, now supports multiple return value on natspec
      data.methods[methodName].returns = value.returns;
      data.methods[methodName].author = value.author;

      if (value.params) {
        const abi = content.abi.filter(x => x.name == methodName);

        data.methods[methodName].params = [];

        const parametersTypesString = fragments[1].substring(0, fragments[1].length - 1);
        const parametersTypes = parametersTypesString.split(',');

        const parametersKeys = Object.keys(data.methods[methodName].params);

        abi[0].inputs.forEach(x => {
          x.description = value.params[x.name];
          data.methods[methodName].params.push(x)
        });
      }

      if (value.returns) {
        data.methods[methodName].outputs.forEach(x => {
          if (value.returns[x.name])
          x.description = value.returns[x.name];
        });
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

module.exports = createDocumentationFor;
