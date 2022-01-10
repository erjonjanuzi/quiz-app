import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import QuizCard from '../quiz/QuizCard';

export default observer(function QuizSection(){
    const { quizStore } = useStore();

    useEffect(() => {
        quizStore.loadQuizzes();
    }, [quizStore.quizRegistry])

    return (
        <>
            <Card.Group itemsPerRow={4} stackable>
                {quizStore.quizzes.map(quiz => <QuizCard key={quiz._id} quiz={quiz} />)}
            </Card.Group>
        </>
    )
})