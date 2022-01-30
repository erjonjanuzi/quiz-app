import { observer } from 'mobx-react-lite';
import { Card } from 'semantic-ui-react';
import { Quiz } from '../../app/models/quiz';
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