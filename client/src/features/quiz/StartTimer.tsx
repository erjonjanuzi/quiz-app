import React from 'react';
import { useTimer } from "react-timer-hook";
import { Container, Header, Segment } from 'semantic-ui-react';

interface TimerSettings {
    autoStart?: boolean;
    expiryTimestamp: Date;
    onExpire?: () => void;
}

export default function StartTimer({expiryTimestamp, onExpire}: TimerSettings) {
    const {
        seconds,
    } = useTimer({ expiryTimestamp, onExpire });


    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container >
                <div style={{ textAlign: 'center' }}>
                    <Header as='h2' content={`Get Ready`} />
                    <Header as='h1' content='Starting in...' />
                    <div style={{ fontSize: '100px' }}>
                        <Header content={seconds} />
                    </div>
                </div>
            </Container>
        </Segment>
    );
}