import React from 'react';
import {observer} from 'mobx-react-lite';
import { Link, NavLink} from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
            <Menu.Item as={NavLink} exact to='/' header>
                    Quizzly
                </Menu.Item>
                <Menu.Item position='right'>
                    <Dropdown pointing='top left' >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/`} 
                                text='My Profile' icon='user' />
                            <Dropdown.Item text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})