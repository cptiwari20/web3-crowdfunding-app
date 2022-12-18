import Link from "next/link"
import { Menu } from "semantic-ui-react"

export default () => {
    return <Menu size='massive'>
        <Menu.Item
            name='Crowdfunding'
           
        />
        <Menu.Menu position={'right'}>
            <Menu.Item
                name='Campaigns'
            />
            <Menu.Item>
                <Link href='/campaign/new'>+</Link>
            </Menu.Item>
        </Menu.Menu>
    </Menu>
}