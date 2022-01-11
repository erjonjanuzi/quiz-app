import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import NavBar from '../../app/layout/NavBar';
import { useStore } from '../../app/stores/store';
import QuizSection from './QuizSection';

export default observer(function Main() {

    return (
        <>
            <NavBar />
            <Header as='h1' content='Browse from community' />
            <QuizSection />
            <Divider />
            <Header as='h1' content='Most popular' />
            <Divider />
            <Header as='h1' content='Browse by subjects' />
        </>
    )
})