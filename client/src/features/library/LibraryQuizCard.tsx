import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Confirm, Icon, Image, Label, Segment } from 'semantic-ui-react';
import { Quiz } from '../../app/models/quiz';
import { useStore } from '../../app/stores/store';

interface Props {
    quiz: Quiz
}

export default observer(function LibraryQuizCard({ quiz }: Props) {
    const { quizStore } = useStore();

    return (
        <>
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
                    <br />
                    <Label icon={quiz.isPublic ? 'eye' : 'lock'} color={quiz.isPublic ? 'green' : 'red'} corner='right' />
                    <Label
                        icon={quiz.isPublic ? 'eye' : 'lock'}
                        content={quiz.isPublic ? 'Public' : 'Private'}
                        basic
                        color={quiz.isPublic ? 'green' : 'red'}
                    />
                </Card.Content>
                <Card.Content extra>
                    <Icon name='play' />
                    Played {quiz.timesPlayed} times
                    <Button
                        as={Link}
                        to={`/quiz/edit/${quiz.id}`}
                        color='pink'
                        icon='edit outline'
                        circular
                        basic
                        floated='right'
                        content='Edit'
                    />
                </Card.Content>
            </Card>
        </>

    )
})

{/* <Confirm
open={openConfirm}
header='Delete quiz'
content='This action cannot be undone. Are you sure?'
cancelButton='Cancel'
confirmButton="Delete"
onCancel={() => setOpenConfirm(false)}
onConfirm={() => console.log('haha')}
/> */}