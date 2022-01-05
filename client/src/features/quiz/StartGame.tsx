import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'semantic-ui-react';

interface Props {
    setStart: (x: boolean) => void
}

export default observer( function StartGame({setStart}: Props) {
    return (
        <Button content='Start Game' onClick={() => setStart(true)} positive/>
    )
})