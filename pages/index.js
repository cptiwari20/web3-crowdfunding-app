import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Header, Segment } from 'semantic-ui-react';

import ContractFactory from '../ethereum/factory';
import Layout from '../components/Layout';
import Link from 'next/link';



const Home = (props) => {
    // const [allCampaigns, setAllCampaigns] = useState([])
    // useEffect(() => {
    //     // fetchDataFromContractFactory()
        
        
    // }, [])
    const renderCards = () => {
       const items = props.campaigns.map(camp => {
            return {
                header: camp,
                description: (
                    <Link href={`campaign/${camp}`}>
                    <p>More details</p>
                    </Link>  
                    ),
                fluid: true,
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
            <Link href='/campaign/new'>
                <Button  style={{marginBotton: '10px'}}  content='Create Campaign' icon='add circle' primary/>
            </Link>
            
            {renderCards()}

        </Layout>
        </>
}

Home.getInitialProps = async () => {
    const campaigns = await ContractFactory.methods.getAllDeployedContract().call()
    return {campaigns}
}

export default Home