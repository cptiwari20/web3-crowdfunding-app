import { useState } from "react"
import { Button, Form, Input, Loader, Message } from "semantic-ui-react"
import { useRouter } from "next/router";
import web3 from "../../../../ethereum/web3";
import campaign from "../../../../ethereum/campaign";
import Layout from "../../../../components/Layout";

const NewRequest = (props) => {
    const [value, setValue] = useState(0);
    const [recipient, setRecipient] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter()
    const handleSubmit = async (e) =>{
        setLoading(true)
        setSuccessMessage('')
        setErrMsg('')
        try {
            e.preventDefault();

            const campaignContract = await campaign(props.campaign_address)
            const accounts = await web3.eth.getAccounts();
            await campaignContract.methods.createRequest(description, web3.utils.toWei(value, "ether"), recipient)
            .send({
                from: accounts[0]
            })
            setLoading(false)
            setSuccessMessage("New request has been created!!")
            router.push(`/campaign/${props.campaign_address}/requests`)
            
        } catch (error) {
            setErrMsg(error.message)
            setLoading(false)
        }
    }
    return <Layout>
        <h3>Create a New Request</h3>

        <Form onSubmit={handleSubmit} error={!!errMsg} success={!!successMessage}>
            <Form.Field >
                <label>Add a description</label>
                <Input 
                    type='text'
                    value={description}
                    onChange={e => {setDescription(e.target.value)}}
                />
            </Form.Field>
            <Form.Field >
                <label>Add a Value</label>
                <Input 
                    label='Ether'
                    type='number'
                    labelPosition='right'
                    value={value}
                    onChange={e => {setValue(e.target.value)}}
                />
            </Form.Field>
            <Form.Field >
                <label>Add a recipient</label>
                <Input 
                    type='text'
                    value={recipient}
                    onChange={e => {setRecipient(e.target.value)}}
                />
            </Form.Field>
            <Message error header='Oops!!' content={errMsg} />
            <Message success header='Wohhoo!!' content={successMessage} />
            <Button loading={isLoading} type='submit' primary>Submit</Button>
            {/* {isLoading ?  <Loader active inline /> :  <} */}
           
        </Form>
    </Layout>
}

NewRequest.getInitialProps = async ({query }) => {
    const campaign_address = query.address;
    return {campaign_address}
}

export default NewRequest;