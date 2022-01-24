import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Card, Divider, Header } from 'semantic-ui-react';
import NavBar from '../../app/layout/NavBar';
import { useStore } from '../../app/stores/store';
import LibraryQuizCard from './LibraryQuizCard';

export default observer(function Mylibrary() {
    const { quizStore } = useStore();

    useEffect(() => {
        quizStore.loadUserQuizzes();
    }, [quizStore.quizLibrary]);

    return (
        <>
            <NavBar />
            <Header as='h1' content='My Quiz Library' />
            <Divider />
            <Card.Group itemsPerRow={4} stackable>
                {quizStore.userQuizzes.map(quiz => <LibraryQuizCard key={quiz.id} quiz={quiz} />)}
            </Card.Group>
        </>
    )
})