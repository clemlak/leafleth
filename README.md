# 📑 Leafleth

Leafleth is a documentation generator for your Solidity smart-contracts. It also integrates a template engine to allow anyone to create customized documentation in a snap.

***Note:** This tool is still in development and new fixes are pushed almost daily, I highly recommend you to update it every time you use it!*

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

The source is the only required option, and it must refer to the path of a `.json` file (a compiled contract) or to an entire directory (for example, the `build/contracts` directory if you are using Truffle).

### 🎛 Options

* `-s` or `--source` **(required)**: The path to a file or a directory, which will be used to generate the documentation.
* `-o` or `--output`: The directory used to output the documentation. If no value is provided, Leafleth will output the documentation into the source directory.
* `-t` or `--template`: The template used to generate the documentation. If no value is provided, the default template will be used.
* `-d` or `--debug`: Enable debug mode.
* `-V` or `--version`: Display the version number.
* `-h` or `--help`: Display usage information.

## 🎨 Create your own themes

Internally, Leafleth uses [Squirrelly](https://squirrelly.js.org/) for its template engine. This means that any type of documentation (Markdown, HTML, ...) can be generated if you provide the right template.

To create a new template, you can use the [default](https://github.com/clemlak/leafleth/blob/master/templates/default.sqrl) one as a base or start a new `.sqrl` file from scratch. The content of the templates is totally free, and the only requirement is that they must be a valid [Squirrelly](https://squirrelly.js.org/) template.

While generating the documentation, Leafleth will send the following object to your template:

```json
{
  "contract": {
    "name": "BasicExample",
    "notice": "A notice for the basic contract",
    "title": "A basic contract",
    "details": "Some dev stuff for the basic contract",
    "author": "Clemlak",
    "networks": {
      "1575142431303": {
        "events": {
          "0x34fc9a8d030d354e59e2bf2e5d0f37f63355b58fdbef38546a8af45588c1c0c1": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "newValue",
                "type": "uint256"
              }
            ],
            "name": "NumberUpdated",
            "type": "event",
            "signature": "0x34fc9a8d030d354e59e2bf2e5d0f37f63355b58fdbef38546a8af45588c1c0c1"
          },
          "0x1e4f1784ac7a8562d6607d2a924880d7c77218e7da91e5c71705ba914a85582f": {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "someValue",
                "type": "uint256"
              }
            ],
            "name": "RandomEvent",
            "type": "event",
            "signature": "0x1e4f1784ac7a8562d6607d2a924880d7c77218e7da91e5c71705ba914a85582f"
          }
        },
        "links": {},
        "address": "0x37dd0087B5c9ea6921a248FF1f69e22b3b4E9E5E",
        "transactionHash": "0x0a6eea50c8ce5db352490659ca42e9c434ef132f58903f9a0eb03f2a792321e6"
      }
    }
  },
  "methods": {
    "isContractReady": {
      "constant": true,
      "payable": false,
      "stateMutability": "view",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ]
    },
    "aRandomNumber": {
      "constant": true,
      "payable": false,
      "stateMutability": "view",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ]
    },
    "setNumber": {
      "constant": false,
      "payable": true,
      "stateMutability": "payable",
      "outputs": [],
      "notice": "Sets a number",
      "details": "This is an external function",
      "author": "ClemLak",
      "params": {
        "newNumber": {
          "description": "The new value of the number",
          "type": "uint256"
        }
      }
    },
    "setNumberIfContractIsReady": {
      "constant": false,
      "payable": false,
      "stateMutability": "nonpayable",
      "outputs": [],
      "notice": "Sets a number if the contract is ready",
      "details": "This is an external function",
      "params": {
        "newNumber": {
          "description": "The new value of the number",
          "type": "uint256"
        }
      }
    },
    "getNumber": {
      "constant": true,
      "payable": false,
      "stateMutability": "view",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "notice": "Gets the number",
      "details": "This is an external view function",
      "return": "The value of the number"
    },
    "getTwoNumbers": {
      "constant": true,
      "payable": false,
      "stateMutability": "pure",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "notice": "Gets two numbers",
      "details": "This function looks complex",
      "return": "A cool numberAnother cool number"
    },
    "add": {
      "constant": true,
      "payable": false,
      "stateMutability": "pure",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "notice": "Add two numbers",
      "details": "This function looks complex",
      "return": "The sum of a + b",
      "params": {
        "b": {
          "description": "Another number",
          "type": "uint256"
        }
      }
    }
  },
  "events": {
    "NumberUpdated": {
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newValue",
          "type": "uint256"
        }
      ],
      "anonymous": false
    },
    "RandomEvent": {
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "someValue",
          "type": "uint256"
        }
      ],
      "anonymous": false
    }
  }
}
```

To display a value, you'll simply have to use its [global reference](https://squirrelly.js.org/docs/v7/global-refs/). For example:

```html
<h1>{{contract.title}}</h1>
```

Methods or other objects can be listed using [loops](https://squirrelly.js.org/docs/v7/cheatsheet#looping-over-objects).

When you're ready, simply run the following command to generate your documentation using your own template:

`leafleth -s <source> -t <yourTemplate>`

## 🛠 Contributing

Feel free to open an issue or create a PR if you want to contribute. Also, submitting new templates will be really appreciated!

## ❌ Known issues

The following issues have been found and will be resolved soon:
* Private or internal functions are not displayed
* Modifiers are not displayed
* Functions from an inherited contract may not be displayed correctly
* Overloaded functions may not be displayed correctly

## 📄 License

[MIT](https://github.com/clemlak/leafleth/blob/master/LICENSE)

