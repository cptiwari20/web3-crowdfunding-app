import web3 from "./web3";
import ContractFactory from './build/CrowdfundFactory.json';   

const instance = new web3.eth.Contract(
    ContractFactory.abi,
    "0xd120379B5e8f05fCDb15526156495B8CF2d7E526"
    // issue addinmg the env variable - need to figure out,
)

export default instance;
