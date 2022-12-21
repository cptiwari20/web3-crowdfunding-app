import web3 from "./web3";
import ContractFactory from './build/CrowdfundFactory.json';   

const instance = new web3.eth.Contract(
    ContractFactory.abi,
    "0xeA83879353de1C2B40E456FaA77809Cc259790D5"
    // issue addinmg the env variable - need to figure out,
)

export default instance;
