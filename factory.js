import web3 from "./web3";
import ContractFactory from './ethereum/build/CrowdfundFactory.json';   

const instance = new web3.eth.Contract(
    ContractFactory.abi,
    "0x03A3b0166Ca3e1Dd7190A206319858E6614c2f28"
    // issue addinmg the env variable - need to figure out,
)

export default instance;
