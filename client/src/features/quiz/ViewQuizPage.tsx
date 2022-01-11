import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Divider, Grid, Header, Icon, Image, Item, Label, Segment, Statistic } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import NavBar from '../../app/layout/NavBar';
import { useStore } from '../../app/stores/store';

export default observer(function ViewQuizPage() {
    const { quizStore, userStore } = useStore();
    const { selectedQuiz, loadQuiz, loadingInitial, clearSelectedQuiz } = quizStore;
    const { id } = useParams<{ id: string }>();

    let count = 1;

    useEffect(() => {
        if (id) loadQuiz(id);
        return () => clearSelectedQuiz();
    }, [id, loadQuiz, clearSelectedQuiz]);

    if (loadingInitial || !selectedQuiz) return <LoadingComponent />;

    return (
        <>
            <NavBar />
            <Grid>
                <Grid.Column width={6}>
                    <Segment>
                        <Image src={`/assets/subjects/${selectedQuiz.subject}.jpeg`} wrapped fluid />
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{selectedQuiz.name}</Card.Header>
                                <Card.Meta>
                                    <span>{selectedQuiz.subject}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {selectedQuiz.description}
                                </Card.Description>
                                <br />
                                <Icon name='user' />
                                <span>Created by Creator</span><br />
                                <Icon name='calendar' />
                                <span>27 December 2021</span>
                            </Card.Content>
                            <Card.Content>
                                <Icon name='play' />
                                <span>{selectedQuiz.timesPlayed} times played</span>
                                <Button
                                    color='red'
                                    basic
                                    floated='right'
                                    icon='heart outline'
                                />
                            </Card.Content>
                        </Card>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Segment.Group>
                        <Segment clearing>
                            <Statistic horizontal>
                                <Statistic.Value>{`${selectedQuiz.questions.length}`}</Statistic.Value>
                                <Statistic.Label>questions</Statistic.Label>
                            </Statistic>
                            <Button
                                as={Link}
                                to={`/quiz/play/${selectedQuiz._id}`}
                                color='pink'
                                icon='play'
                                floated='right'
                                content='Play'
                                size='huge'
                            />
                        </Segment>
                        <Segment>
                            {selectedQuiz.questions.map(question => {
                                return <Segment secondary color='purple' >
                                    <Label content={count++} circular size='massive' />
                                    <Header as='h1' content={question.text} style={{"display": "inline", "margin-left": "10px"}}/>
                                    <Header sub content={`${question.points} points`} floated='right' color='green' />
                                </Segment>
                            })}
                        </Segment>
                    </Segment.Group>



                </Grid.Column>
            </Grid>
        </>
    )
})