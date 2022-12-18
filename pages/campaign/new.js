import { useState } from "react"
import { Button, Form, Input, Loader } from "semantic-ui-react"
import Layout from "../../components/Layout"
import web3 from "../../web3";
import ContractFactory from '../../factory';
import { useRouter } from "next/router";

const New = () => {
    const [minimumContribution, setMinimumContribution] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter()
    const handleSubmit = async (e) =>{
        setLoading(true)
        e.preventDefault();
        const accounts = await web3.eth.getAccounts();
        await ContractFactory.methods.createContract(minimumContribution)
        .send({
            from: accounts[0]
        })
        setLoading(false)
        router.push('/')

    }
    return <Layout>
        <h3>New Campaign</h3>

        <Form onSubmit={handleSubmit}>
            <Form.Field >
                <label>Minimum Contribution</label>
                <Input 
                    label='Wie'
                    type='number'
                    labelPosition='right'
                    value={minimumContribution}
                    onChange={e => {setMinimumContribution(e.target.value)}}
                />
            </Form.Field>
            {isLoading ?  <Loader active inline /> :  <Button type='submit' primary>Create</Button>}
           
        </Form>
    </Layout>
}

export default New;