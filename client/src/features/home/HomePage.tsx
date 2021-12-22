import { observer } from 'mobx-react-lite';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';


export default observer(function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    Quizzly
                </Header>
            </Container>
        </Segment>
    )
})