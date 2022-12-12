const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
 
const { abi, evm } = require('../ethereum/build/CrowdfundFactory.json');
const { abi: mainContractABI, evm: mainContractEVM } = require('../ethereum/build/Crowdfund.json');

let accounts;
let factory;
let campaignContract;
let campaignContractAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(abi)
    .deploy({
        data: evm.bytecode.object,
    }).send({
        from: accounts[0],
        gas: '3000000'
    })

    await factory.methods.createContract("0")
    .send({
        from: accounts[0],
        gas: '3000000',   
    })

   // const getDeployedContracts = await factory.methods.getAllDeployedContract();
   const getDeployedContracts = await factory.methods.getAllDeployedContract();
  //paignContract = await new web3.eth.Contract(mainContractABI, getDeployedContracts[0])

    console.log(getDeployedContracts.options.allDeployedContracts)
})

describe('CrowdfundFactory deploys', () => {
    it('deploys a contract', () => {
        assert.ok(factory.options.address)
        assert.ok(campaignContract.options.address)
    })
})