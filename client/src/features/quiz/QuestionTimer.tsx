import { useTimer } from "react-timer-hook";
import { Header } from 'semantic-ui-react';

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