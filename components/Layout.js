import { Container } from "semantic-ui-react"
import Header from "./Header"
import 'semantic-ui-css/semantic.min.css'

export default (props) => {
    return <Container style={{ margin: 20 }}>
        <Header/>
        {props.children}
    </Container>
}