import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { Button, Card, Form, Grid, Input, Loader, Message } from "semantic-ui-react"
import Layout from "../../components/Layout"
import web3 from "../../ethereum/web3";
import campaign from "../../ethereum/campaign";
import ContibuteForm from "../../components/ContibuteForm";
const { abi: mainContractABI, evm: mainContractEVM } = require('../../ethereum/build/Crowdfund.json');

const Campaign = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const items = [
        {
          header: 'Manager',
          description:
            props.manager,
          meta: 'The adreess of the owner of this crowdfund campagin',
          styles: "text-wrap: word-wrap"
        },
        {
          header: props.minimumContribution + ' Wei',
          description:
            'Minimum contribution in Wei; equal to ' + web3.utils.fromWei(props.minimumContribution, 'ether') + ' Ether.',
          meta: 'This is the minimum amount required to contribute in this crowdfund campagin',
        },
        {
          header: props.totalApprovers,
          description:
            'Total Approvers',
          meta: 'This is the total approvers in this crowdfund campagin who have been contributed to this campagin',
        },
        {
          header: props.totalRequests,
          description:
            'Total Requests',
          meta: 'This is the total requests in this crowdfund campagin to send the money to',
        },
        {
          header: props.balance + ' Wei',
          description:
            'Crowdfund Campaign Balance',
          meta: 'This is the total amount in this crowdfund campagin, equal to ' + web3.utils.fromWei(props.balance, 'ether') + ' Ether.',
        },
      ]

    return <Layout>
        <h3>Campaign Detail</h3>
        <Grid>
            <Grid.Row>
                <Card.Group items={items} />
            </Grid.Row>
            <Grid.Row>
                <ContibuteForm {...props}/>
            </Grid.Row>
        </Grid>

       
    </Layout>
}

Campaign.getInitialProps = async ({query}) => {
    // const router = useRouter()
    const campaign_address = query.address;
    const campaignContract = await campaign(campaign_address)
    const summary = await campaignContract.methods.getSummary().call();
    return {
        manager: summary[0],
        minimumContribution: summary[1],
        totalRequests: summary[2],
        totalApprovers: summary[3],
        balance: summary[4],
        address: campaign_address
    }

}


export default Campaign;