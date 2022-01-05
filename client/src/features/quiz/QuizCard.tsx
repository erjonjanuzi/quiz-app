import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Segment } from 'semantic-ui-react';

interface Props {
    quiz: any
}

export default observer(function QuizCard({ quiz }: Props) {

    return (
        <Link to={`/quiz/view/${quiz.id}`}>
            <Card link>
                <Image src='https://icebreakerideas.com/wp-content/uploads/2020/09/Geography-Trivia-e1608679560350.jpg' wrapped ui={false} />
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
                        to={`/quiz/play/${quiz.id}`}
                        color='pink'
                        floated='right'
                        content='Play'
                    />
                </Card.Content>
            </Card>
        </ Link>
    )
})