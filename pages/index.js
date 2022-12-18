import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Header, Segment } from 'semantic-ui-react';

import ContractFactory from '../factory';
import Layout from '../components/Layout';



const Home = (props) => {
    const [allCampaigns, setAllCampaigns] = useState([])
    console.log(props.campaigns)
    useEffect(() => {
        // fetchDataFromContractFactory()
        
        
    }, [])
    const renderCards = () => {
       const items = props.campaigns.map(camp => {
            return {
                header: camp,
                description: 'Know more..',
                fluid: true
            }
        })
        if (items.length) {
            return <Card.Group items={items} />
            
        } else {
            return <Segment>No Campaign Exists</Segment>
        }
    }

    return <>
        <Layout>
            <Header as='h3'>All Campaigns</Header>
            <Divider />
            <Button  content='Create Campaign' icon='add circle' primary/>
            
            {renderCards()}

        </Layout>
        </>
}

Home.getInitialProps = async () => {
    const campaigns = await ContractFactory.methods.getAllDeployedContract().call()
    return {campaigns}
}

export default Home