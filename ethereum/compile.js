const path = require('path')
const fs = require('fs-extra')
const solc = require('solc');

// remove the build directory with older abi
const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)
// read the source code from the contracts file
const contractFile = path.resolve(__dirname, 'contracts', 'Crowdfunding.sol')
const source = fs.readFileSync(contractFile, 'utf8')

//convert to readable format

const input = {
    language: 'Solidity',
    sources: {
      'Crowdfunding.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };
// compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Crowdfunding.sol']
// console.log(output);
// recreate the build dir
fs.ensureDirSync(buildPath)
// write the output to the build directory
for(let contract in output){
    fs.outputJSONSync(
        path.resolve(__dirname, buildPath, contract + '.json'),
        output[contract]
    )
}
console.log("The contract has been compiled successfully!")