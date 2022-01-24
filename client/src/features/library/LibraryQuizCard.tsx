import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Segment } from 'semantic-ui-react';
import { Quiz } from '../../app/models/quiz';

interface Props {
    quiz: Quiz
}

export default observer(function LibraryQuizCard({ quiz }: Props) {

    return (
        <Card link as={Link} to={`/quiz/view/${quiz.id}`}>
            <Image src={`/assets/subjects/${quiz.subject}.jpeg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{quiz.name}</Card.Header>
                <Card.Meta>
                    <span>{quiz.subject}</span>
                </Card.Meta>
                <Card.Description>
                    {quiz.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='play' />
                Played {quiz.timesPlayed} times
                <Button
                    as={Link}
                    to={`/quiz/play/${quiz.id}`}
                    color='pink'
                    floated='right'
                    content='Play'
                />
            </Card.Content>
        </Card>
    )
})