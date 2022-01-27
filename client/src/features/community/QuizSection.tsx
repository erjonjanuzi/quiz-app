import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { Button, Card, Placeholder, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Quiz } from '../../app/models/quiz';
import { useStore } from '../../app/stores/store';
import QuizCard from '../quiz/QuizCard';

interface Props {
    quizzes: Quiz[]
}

export default observer(function QuizSection({quizzes}: Props) {

    return (
        <>
            <Card.Group itemsPerRow={4} stackable>
                {quizzes.map(quiz => <QuizCard key={quiz.id} quiz={quiz} />)}
            </Card.Group>
        </>
    )
})