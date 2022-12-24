import { useState } from "react"
import { useRouter } from "next/router";
import { Button, Grid, Label, List, Table } from "semantic-ui-react";
import Link from "next/link";
import web3 from "../../../../ethereum/web3";
import Layout from "../../../../components/Layout";
import campaign from "../../../../ethereum/campaign";

const AllRequests = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const router = useRouter()
//    console.log(props)
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
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Recipent</Table.HeaderCell>
                        <Table.HeaderCell>Total Approvers</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.requests.map((request, idx) => {
                        return <Table.Row key={idx}>
                            <Table.Cell>{idx}</Table.Cell>
                            <Table.Cell>{request.description}</Table.Cell>
                            <Table.Cell>{request.value}</Table.Cell>
                            <Table.Cell>{request.complete}</Table.Cell>
                            <Table.Cell>{request.recipient}</Table.Cell>
                            <Table.Cell>{request.approvalCount}</Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
            </Grid.Row>
        </Grid>
    </Layout>
}

AllRequests.getInitialProps = async ({query}) => {
    const campaign_address = query.address;
    const campaignContract = await campaign(campaign_address)
    const totalNumberOfRequests = await campaignContract.methods.getRequestsCount().call();
    const requests = [];
    for(let i = 0; i < totalNumberOfRequests; i++){
        const getRequest = await campaignContract.methods.requests(i).call();
        requests.push(getRequest);
    }

    return {requests, campaign_address, totalNumberOfRequests}
}

export default AllRequests;