import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button, Divider } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    Quizzly
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                        <>
                            <LoginForm />
                            {/* <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                                Register!
                            </Button>
                            <Divider horizontal inverted>Or</Divider>
                            <Button 
                                loading={userStore.fbLoading}
                                size='huge'
                                inverted
                                color='facebook'
                                content='Login with Facebook'
                                onClick={userStore.facebookLogin}
                            /> */}
                        </>

                    )}
            </Container>
        </Segment>
    )
})