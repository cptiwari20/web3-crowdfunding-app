import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { Button, Form, Input, Loader, Message } from "semantic-ui-react"
import Layout from "../../components/Layout"
import web3 from "../../ethereum/web3";
const { abi: mainContractABI, evm: mainContractEVM } = require('../../ethereum/build/Crowdfund.json');

const Campaign = () => {
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const router = useRouter()
    const campaign_address = router.query.address;

    useEffect(() => {
        getCampaginDetails()
    }, [])
    const getCampaginDetails = async () => {
        const campaignContract = await new web3.eth.Contract(mainContractABI, campaign_address)
        const balance = await web3.eth.getBalance(campaign_address);
        const approvers = await campaignContract.methods.approvers().call();
        const requests = await campaignContract.methods.requests().call();
        console.log(balance, approvers, requests)
    }

    return <Layout>
        <h3>Campaign Detail</h3>

       
    </Layout>
}


export default Campaign;