import { useState } from "react"
import { Button, Form, Input, Loader, Message } from "semantic-ui-react"
import Layout from "../../components/Layout"
import web3 from "../../web3";
import ContractFactory from '../../factory';
import { useRouter } from "next/router";

const New = () => {
    const [minimumContribution, setMinimumContribution] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const router = useRouter()
    const handleSubmit = async (e) =>{
        setLoading(true)
        setErrMsg('')
        try {
            e.preventDefault();
            const accounts = await web3.eth.getAccounts();
            await ContractFactory.methods.createContract(minimumContribution)
            .send({
                from: accounts[0]
            })
            setLoading(false)
            router.push('/')
            
        } catch (error) {
            setErrMsg(error.message)
            setLoading(false)
        }

    }
    return <Layout>
        <h3>New Campaign</h3>

        <Form onSubmit={handleSubmit} error={errMsg}>
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
            <Message error header='Oops!!' content={errMsg} />
            <Button loading={isLoading} type='submit' primary>Create</Button>
            {/* {isLoading ?  <Loader active inline /> :  <} */}
           
        </Form>
    </Layout>
}

export default New;