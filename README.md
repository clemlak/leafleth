# � Leafleth

Leafleth is a documentation generator for your smart-contracts written in Solidity. It also uses a template engine to allow anyone to create customized documentation in a snap.

## 🎉 Example

[This example](https://github.com/clemlak/leafleth/blob/master/examples/BasicExample.md) was generated using the default template provided by Leafleth.

## 📦 Installation

You can install Leafleth as a global package:

Using npm:

`npm i -g leafleth`

Or using yarn:

`yarn add global leafleth`

Additionally, Leafleth can be installed as a local package in your project.

## 🚀 Usage

First of all, be sure to comment your smart-contracts according to the [NatSpec format](https://solidity.readthedocs.io/en/latest/natspec-format.html). Once you're done, compile your contracts and let Leafleth handle the rest!

Use the following command to generate your documentation:

`leafleth -s <source>`

The source is the only required option, and it may refer to the path to a `.json` file (a compiled contract) or to an entire directory.

### 🎛 Options

* `-s` or `--source` **(required)**: The path to a file or a directory, which will be used to generate the documentation.
* `-o` or `--output`: The directory used to output the documentation. If no value is provided, Leafleth will create a `docs` directory.
* `-t` or `--template`: The template used to generate the documentation. If no value is provided, the default template will be used
* `-V` or `--version`: Output the version number
* `-h` or `--help`: Output usage information 

## 🎨 Create your own themes

Internally, Leafleth uses [Squirrelly](https://squirrelly.js.org/) for its template engine. This means that any type of documentation (Markdown, HTML, ...) can be generated if you provide the right template.

To create a new template, you can use the [default](https://github.com/clemlak/leafleth/blob/master/templates/default.sqrl) one as a base or start a new `.sqrl` file from scratch. The content of the templates is totally free, and the only requirement is that they must be a valid [Squirrelly](https://squirrelly.js.org/) template.

While generating the documentation, Leafleth will send the following object to your template:

```:javascript
{
  contract: {
    name: 'BasicExample',
    notice: 'A notice for the basic contract',
    title: 'A basic contract',
    details: 'Some dev stuff for the basic contract',
    author: 'Clemlak'
  },
  methods: {
    add: {
      notice: 'Add two numbers',
      details: 'This function looks complex',
      return: 'The sum of a + b',
      params: {
        a: {
          description: 'A number',
          type: 'uint256'
        },
        b: {
          description: 'Another number',
          type: 'uint256'
        }
      }
    }
  }
}
```

To display a value, you'll simply have to use its [global reference](https://squirrelly.js.org/docs/v7/global-refs/). For example:

```:html
<h1>{{contract.title}}</h1>
```

Methods or other objects can be listed using [loops](https://squirrelly.js.org/docs/v7/cheatsheet#looping-over-objects).

When you're ready, simply run the following command to generate your documentation using your own template:

`leafleth -s <source> -t <yourTemplate>`

## 🛠 Contributing

Feel free to open an issue or create a PR if you want to contribute. Also, submitting new templates will be really appreciated!

## 📄 License

[MIT](https://github.com/clemlak/leafleth/blob/master/LICENSE)

