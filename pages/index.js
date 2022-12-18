import App from 'next/app';
import React, { useEffect, useState } from 'react';
import ContractFactory from '../factory';



const Home = (props) => {
    const [allCampaigns, setAllCampaigns] = useState([])
    console.log(props.campaigns)
    useEffect(() => {
        // fetchDataFromContractFactory()
        
        
    }, [])
    // const fetchDataFromContractFactory = async () =>{
    //     const campaigns = await ContractFactory.methods.getAllDeployedContract().call()
    //     console.log(campaigns)
    //     setAllCampaigns(campaigns)
    // }

    return <>
        <h1>Welcome to the Crowdfunding app</h1>
        {/* {allCampaigns.map(camp => {
            <h2>{"camp"}</h2>
        })} */}
        </>
}

Home.getInitialProps = async () => {
    const campaigns = await ContractFactory.methods.getAllDeployedContract().call()
    return {campaigns}
}

export default Home