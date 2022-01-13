import React from 'react';
import { useTimer } from "react-timer-hook";
import { Container, Header, Segment } from 'semantic-ui-react';

interface TimerSettings {
    autoStart?: boolean;
    expiryTimestamp: Date;
    onExpire?: () => void;
}

export default function QuestionTimer({ expiryTimestamp, onExpire }: TimerSettings) {
    const {
        seconds,
    } = useTimer({ expiryTimestamp, onExpire });


    return (
        <div style={{ fontSize: '40px' }}>
            <Header content={`${seconds}`} />
        </div>
    );
}