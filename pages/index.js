import React, { useEffect, useState } from 'react';
import ContractFactory from '../factory';

export default () => {
    const [allCampaigns, setAllCampaigns] = useState([])

    useEffect(() => {
        fetchDataFromContractFactory()
    }, [])
    const fetchDataFromContractFactory = async () =>{
        const campaigns = await ContractFactory.methods.getAllDeployedContract().call()
        console.log(campaigns)
        setAllCampaigns(campaigns)
    }

    return <>
        <h1>Welcome to the Crowdfunding app</h1>
        {/* {allCampaigns.map(camp => {
            <h2>{"camp"}</h2>
        })} */}
        </>
}