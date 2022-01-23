import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import NavBar from '../../app/layout/NavBar';

export default observer(function Mylibrary() {

    useEffect(() => {

    });

    return (
        <>
            <NavBar />
            <Header as='h1' content='My Quiz Library' />
            <Divider />
        </>
    )
})