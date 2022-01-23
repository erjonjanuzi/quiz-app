import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { Button, Card, Placeholder, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import QuizCard from '../quiz/QuizCard';

export default observer(function QuizSection() {
    const { quizStore, userStore } = useStore();

    useEffect(() => {
        quizStore.loadQuizzes();
    }, [quizStore.quizRegistry])

    return (
        <>
            <Card.Group itemsPerRow={4} stackable>
                {quizStore.quizzes.map(quiz => <QuizCard key={quiz.id} quiz={quiz} />)}
            </Card.Group>
        </>
    )
})