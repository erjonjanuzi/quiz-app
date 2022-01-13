import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    Quizzly
                </Menu.Item>
                <Menu.Item icon='star' as={NavLink} to='/community' name='Community' />
                <Menu.Item icon='heart' as={NavLink} to='/favorited' name='Favorited' />
                <Menu.Item icon='list' as={NavLink} to='/favorited' name='My Library' />
                <Menu.Item position='right'>
                    <Button as={NavLink} to='/' positive content='Create Quiz' fluid />
                </Menu.Item>
                <Menu.Item >
                    <Image src={'/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.firstName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user}`}
                                text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})