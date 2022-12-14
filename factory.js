import web3 from "./web3";
import ContractFactory from './ethereum/build/CrowdfundFactory.json';   

const instance = new web3.eth.Contract(
    ContractFactory.abi,
    "0x8F227B157E1E6330450b5d0031bEE3d20175928b"
)

export default instance;