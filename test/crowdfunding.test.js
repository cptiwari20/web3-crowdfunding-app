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

    await factory.methods.createContract("100")
    .send({
        from: accounts[0],
        gas: '3000000',   
    })

   
   const getDeployedContracts = await factory.methods.getAllDeployedContract().call();
   campaignContractAddress = getDeployedContracts[0];
   campaignContract = await new web3.eth.Contract(mainContractABI, getDeployedContracts[0])
})

describe('CrowdfundFactory deploys', () => {
    it('deploys a contract', () => {
        assert.ok(factory.options.address)
        assert.ok(campaignContract.options.address)
    })

    it('address 1 should be a manager', async () => {
        const manager = await campaignContract.methods.manager().call();
        assert.equal(manager, accounts[0])
    })
    it('allows other users to contribute and add as approvers', async() => {
        const newAccountUser = accounts[1];
        await campaignContract.methods.contribute().send({
            from: newAccountUser,
            value:"101"
        });
        const isContributer = await campaignContract.methods.approvers(newAccountUser).call();
        assert.ok(isContributer);
    })
    it('should allow to have a minimum contribution', async () => {
        try{
            const newAccountUser = accounts[2];
            await campaignContract.methods.contribute().send({
                from: newAccountUser,
                value: "50"
            })
            assert(false)
        }catch(error) {
            assert(error)
        }
    })
    it('should only allow manager to create a request', async () => {
        // try{
            // const description = 'Buy one AWS server subscription';
            // console.log(campaignContract.methods)
            // await campaignContract.methods
            // .createRequest(description, 1000, accounts[1])
            // .send({
            //     from: accounts[0],
            //     gas: "3000000"
            // })
            // const request = await campaignContract.methods.requests(0).call();
            // console.log(request)
            // assert.equal(description, request.description)

        // }catch(err){
        //     console.log(err)
        // }
        await campaignContract.methods
        .createRequest("Buy batteries", "100", accounts[1])
        .send({
            from: accounts[0],
            gas: "1000000",
        });
        const request = await campaignContract.methods.requests(0).call();
    
        assert.equal("Buy batteries", request.description);

    })
    
})