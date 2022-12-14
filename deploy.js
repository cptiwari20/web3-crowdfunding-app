const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./ethereum/build/CrowdfundFactory.json');
require('dotenv').config();

const provider = new HDWalletProvider(
    process.env.WALLET_SECRET_PHRASE,
    process.env.INFURA_API,
)

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const getAccounts = await web3.eth.getAccounts();
        console.log('Ready to deploy to the account == ', getAccounts[0])
    
        const result = await new web3.eth.Contract(abi)
            .deploy({
                data: evm.bytecode.object
            })
            .send({
                from: getAccounts[0],
                gas: '3000000'
            });
            console.log('Deployed to the address == ', result.options.address)
        //stop the provider engine
        provider.engine.stop();
    } catch (error) {
        console.log(error)
    }
};
deploy();