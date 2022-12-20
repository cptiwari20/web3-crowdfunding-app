import Link from "next/link"
import { Menu } from "semantic-ui-react"

export default () => {
    return <Menu size='massive'>
        <Menu.Item>
            <Link href='/'>Crowdfunding</Link>
        </Menu.Item>
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