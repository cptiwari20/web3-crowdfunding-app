import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

export default (props) => {
    const [value, setValue] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const handleSubmit = async (e) =>{
        setLoading(true)
        setErrMsg('')
        try {
            e.preventDefault();
            const accounts = await web3.eth.getAccounts();
            const campaginContract = await campaign(props.address)
            await campaginContract.methods.contribute()
            .send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            })
            setLoading(false)
            router.reload();
            setSuccessMessage('Contributed successfully!')
            
        } catch (error) {
            setErrMsg(error.message)
            setLoading(false)
        }

    }
    return (
        <Form onSubmit={handleSubmit} error={!!errMsg} success={!!successMessage}>
            <Form.Field >
                <label>Contribute to Campaign</label>
                <Input 
                    label='Eth'
                    type='number'
                    labelPosition='right'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </Form.Field>
            <Message error header='Oops!!' content={errMsg} />
            <Message success header='Wohoo!!' content={successMessage} />
            <Button loading={isLoading} type='submit' primary>Contribute</Button>
            {/* {isLoading ?  <Loader active inline /> :  <} */}
    
        </Form>
    )
}