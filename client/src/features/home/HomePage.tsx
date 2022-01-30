import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button, Divider } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

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
                        <Header as='h2' inverted content='Welcome to Quizzly' />
                        <Button as={Link} to='/community' size='huge' inverted>
                            Browse Quizzes!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                        </Button>
                        <Divider horizontal inverted>Or</Divider>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register!
                        </Button>
                        {/* <Divider horizontal inverted>Or</Divider>
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