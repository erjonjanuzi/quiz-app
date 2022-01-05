import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Header, Segment, Image, Button, Divider } from 'semantic-ui-react';
import PlayGameHome from '../play/PlayGameHome';
import { Link } from 'react-router-dom';

export default observer(function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    Quizzly
                </Header>
                <PlayGameHome />
                <Divider />
                <Segment basic>
                    <Header >
                        or <Button as={Link} to='/host' inverted>
                            Host!
                        </Button>
                    </Header>
                </Segment>
            </Container>
        </Segment>
    )
})