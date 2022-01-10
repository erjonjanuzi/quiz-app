import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Segment } from 'semantic-ui-react';
import { Quiz } from '../../app/models/quiz';

interface Props {
    quiz: Quiz
}

export default observer(function QuizCard({ quiz }: Props) {

    return (
            <Card link>
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
                    <a>
                        <Icon name='play' />
                        Played {quiz.timesPlayed} times
                    </a>
                    <Button
                        as={Link}
                        to={`/quiz/play/${quiz._id}`}
                        color='pink'
                        floated='right'
                        content='Play'
                    />
                </Card.Content>
            </Card>
    )
})