import { useState } from "react"
import { useRouter } from "next/router";
import { Button, Grid, Label, List, Message, Segment, Table } from "semantic-ui-react";
import Link from "next/link";
import web3 from "../../../../ethereum/web3";
import Layout from "../../../../components/Layout";
import campaign from "../../../../ethereum/campaign";

const AllRequests = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const router = useRouter()

    const handleApprove = async (id) => {
        setLoading(true)
        setErrMsg('')
        setSuccessMsg('')
        try {
            const accounts = await web3.eth.getAccounts();
            const campaignContract = await campaign(props.campaign_address)
            await campaignContract.methods.approveRequest(id).send({
                from: accounts[0]
            }) 
            setSuccessMsg('Approved Successfully!')
            setLoading(false)
            router.reload()
        } catch (error) {
            setErrMsg(error.message)
            setLoading(false)
        }
    }

    const handleFinalize = async (id) => {
        setLoading(true)
        setErrMsg('')
        setSuccessMsg('')
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts)
            const campaignContract = await campaign(props.campaign_address)
            await campaignContract.methods.finalizeRequest(id).send({
                from: accounts[0]
            }) 
            setSuccessMsg('Finalized Successfully!')
            setLoading(false)
            router.reload()
        } catch (error) {
            setErrMsg(error.message)
            setLoading(false)
        }
    }
    return <Layout>
        <Grid columns='2'>
            <Grid.Row >
                <Grid.Column width={8}>
                    <h3>All Requests
                        <Label as='a' tag>Total Request: {props.totalNumberOfRequests}</Label>
                    </h3>
                </Grid.Column>
                <Grid.Column>
                    <Link href={`/campaign/${props.campaign_address}/requests/new`}>
                        <Button primary>Create a new request</Button>
                    </Link>
                </Grid.Column>
            </Grid.Row>
    
               
            <Grid.Row>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Number</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>value</Table.HeaderCell>
                        <Table.HeaderCell>Recipent</Table.HeaderCell>
                        <Table.HeaderCell>Total Approvers</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.requests.map((request, idx) => {
                         const readyToFinalise = request.approvalCount  >= (props.totalNumberOfApprovers / 2);
                         const requestFulfilled = request.approvalCount  >= (props.totalNumberOfApprovers);
                        return <Table.Row key={idx} disabled={request.complete} positive={!request.complete && readyToFinalise}>
                            <Table.Cell>{idx}</Table.Cell>
                            <Table.Cell>{request.description}</Table.Cell>
                            <Table.Cell>{web3.utils.fromWei(request.value, 'ether')} Ether</Table.Cell>
                            <Table.Cell>{request.recipient}</Table.Cell>
                            <Table.Cell>{request.approvalCount} / {props.totalNumberOfApprovers}</Table.Cell>
                            <Table.Cell>
                                {!request.complete && !requestFulfilled && <Button loading={!!isLoading} onClick={() => handleApprove(idx)} color='green'>Approve</Button>}
                                {!!readyToFinalise && !request.complete && <Button loading={!!isLoading} onClick={() => handleFinalize(idx)} color='teal'>Finalize</Button>}
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
                {errMsg && <Message error header='Oops!!' content={errMsg} />}
                { successMsg && <Message success header='Wohhoo!!' content={successMsg} />}
            </Grid.Row>
        </Grid>
    </Layout>
}

AllRequests.getInitialProps = async ({query}) => {
    const campaign_address = query.address;
    const campaignContract = await campaign(campaign_address)
    const totalNumberOfRequests = await campaignContract.methods.getRequestsCount().call();
    const totalNumberOfApprovers = await campaignContract.methods.approversCount().call();
    const requests = [];
    for(let i = 0; i < totalNumberOfRequests; i++){
        const getRequest = await campaignContract.methods.requests(i).call();
        requests.push(getRequest);
    }

    console.log({totalNumberOfApprovers})
    return {requests, campaign_address, totalNumberOfRequests, totalNumberOfApprovers}
}

export default AllRequests;