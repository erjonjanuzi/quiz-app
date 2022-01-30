import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Confirm, Divider, Grid, Header, Icon, Image, Label, Message, Segment, Statistic } from 'semantic-ui-react';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import LoadingComponent from '../../app/layout/LoadingComponent';
import NavBar from '../../app/layout/NavBar';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { subjectOptions } from '../../app/common/options/subjectOptions';
import { history } from '../..';
import { pointsOptions } from '../../app/common/options/pointsOptions';
import { timeOptions } from '../../app/common/options/timeOptions';
import { correctOptions } from '../../app/common/options/correctOptions';

export default observer(function EditQuiz() {
    const { quizStore } = useStore();
    const { selectedQuiz, loadQuiz, loadingInitial, clearSelectedQuiz } = quizStore;
    const { id } = useParams<{ id: string }>();
    const [updated, setUpdated] = useState(false);
    const [addQuestion, setAddQuestion] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const quizValidationSchema = Yup.object({
        name: Yup.string().required('Question name is required'),
        description: Yup.string().required('Provide a short description'),
        subject: Yup.string().required('Choose a subject'),
    });

    const questionsValidationSchema = Yup.object({
        text: Yup.string().required('Question text is required'),
        points: Yup.string().required('Points are required'),
        time: Yup.string().required('Time is required'),
        answer1: Yup.string().required('Answer required'),
        answer2: Yup.string().required('Answer required'),
        answer3: Yup.string().required('Answer required'),
        answer4: Yup.string().required('Answer required'),
        correct: Yup.string().required('Choose the correct answer'),
    });

    useEffect(() => {
        if (id) loadQuiz(id);
        return () => clearSelectedQuiz();
    }, [id, loadQuiz, quizStore.updateQuiz, quizStore.changeVisibility, quizStore.addQuestion, quizStore.removeQuestion, clearSelectedQuiz]);

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
                                <Icon name='calendar' />
                                <span>{selectedQuiz.createdAt.toString().split('T')[0]}</span>
                                <br /><br />
                                <Label
                                    icon={selectedQuiz.isPublic ? 'eye' : 'lock'}
                                    content={selectedQuiz.isPublic ? 'Public' : 'Private'}
                                    basic
                                    color={selectedQuiz.isPublic ? 'green' : 'red'}
                                />
                            </Card.Content>
                            <Card.Content>
                                <Button
                                    content={selectedQuiz.isPublic ? 'Set private' : 'Set public'}
                                    icon={selectedQuiz.isPublic ? 'lock' : 'eye'}
                                    color='facebook'
                                    onClick={() => quizStore.changeVisibility(id)}
                                    disabled={selectedQuiz.questions.length < 1 && !selectedQuiz.isPublic}
                                />

                                <Button
                                    content='Delete quiz'
                                    icon='trash'
                                    color='red'
                                    basic
                                    onClick={() => setOpenConfirm(true)}
                                    floated='right'
                                />
                                {selectedQuiz.questions.length < 1 && !selectedQuiz.isPublic &&
                                    <Message content='Add questions to make this quiz public' color='red' icon={'cross'} />}
                            </Card.Content>
                        </Card>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Segment>
                        <Formik
                            initialValues={{ name: selectedQuiz.name, description: selectedQuiz.description, subject: selectedQuiz.subject, error: null }}
                            onSubmit={(values, { setErrors }) => quizStore.updateQuiz(id, values).then(() => setUpdated(true)).catch(error => setErrors({ error: error.response.data }))}
                            validationSchema={quizValidationSchema}
                        >
                            {({ handleSubmit, isValid, dirty, isSubmitting, errors }) => (
                                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                    {updated &&
                                        <Message icon={'check'} content='Updated successfully' color='green' />}
                                    <MyTextInput name='name' placeholder='Quiz name...' />
                                    <MyTextArea name='description' placeholder='Description' rows={3} />
                                    <MySelectInput name='subject' placeholder='Subject' options={subjectOptions} />
                                    <ErrorMessage
                                        name='error' render={() =>
                                            <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                                    />
                                    <Divider />
                                    <Button
                                        disabled={isSubmitting || !dirty || !isValid}
                                        type='submit' content='Save' color='pink' />
                                    <Button loading={isSubmitting} basic content='Cancel' type='cancel' onClick={() => history.push('/library')} />
                                </Form>
                            )}
                        </Formik>
                    </Segment>
                    <Segment>
                        <Statistic horizontal>
                            <Statistic.Value>{`${selectedQuiz.questions.length}`}</Statistic.Value>
                            <Statistic.Label>question{selectedQuiz.questions.length > 1 ? 's' : ''}</Statistic.Label>
                        </Statistic>
                        <Button content='Add question' icon='plus' labelPosition='left' fluid color='blue' basic type='button'
                            onClick={() => setAddQuestion(true)}
                        />
                        {addQuestion &&
                            <Segment>
                                <Header content='Add new question' sub color='pink' />
                                <Divider />
                                <Formik
                                    initialValues={{ text: '', points: '', time: '', error: null }}
                                    onSubmit={(values, { setErrors }) =>
                                        quizStore.addQuestion(id, values).then(() => setAddQuestion(false)).catch(error => setErrors({ error: error.response.data }))
                                    }
                                    validationSchema={questionsValidationSchema}
                                >
                                    {({ handleSubmit, isSubmitting, errors, dirty, isValid }) => (
                                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                            <MyTextInput name='text' placeholder='Question' />
                                            <MySelectInput name='points' placeholder='Points' options={pointsOptions} />
                                            <MySelectInput name='time' placeholder='Timer' options={timeOptions} />
                                            <Grid>
                                                <Grid.Row >
                                                    <Grid.Column width={1}>
                                                        <Label content='a)' circular color='red' />
                                                    </Grid.Column>
                                                    <Grid.Column width={15}>
                                                        <MyTextInput name='answer1' placeholder='Answer 1' />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row >
                                                    <Grid.Column width={1}>
                                                        <Label content='b)' circular color='red' />
                                                    </Grid.Column>
                                                    <Grid.Column width={15}>
                                                        <MyTextInput name='answer2' placeholder='Answer 2' />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row >
                                                    <Grid.Column width={1}>
                                                        <Label content='c)' circular color='red' />
                                                    </Grid.Column>
                                                    <Grid.Column width={15}>
                                                        <MyTextInput name='answer3' placeholder='Answer 3' />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row >
                                                    <Grid.Column width={1}>
                                                        <Label content='d)' circular color='red' />
                                                    </Grid.Column>
                                                    <Grid.Column width={15}>
                                                        <MyTextInput name='answer4' placeholder='Answer 4' />
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                            <br />
                                            <MySelectInput name='correct' placeholder='Select correct answer' options={correctOptions} />
                                            <ErrorMessage
                                                name='error' render={() =>
                                                    <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                                            />
                                            <Divider />
                                            <Button
                                                disabled={isSubmitting || !dirty || !isValid}
                                                loading={isSubmitting}
                                                color='pink' type='submit' content='Add question' />
                                            <Button loading={isSubmitting} basic content='Cancel' type='cancel' onClick={() => setAddQuestion(false)} />
                                        </Form>
                                    )}
                                </Formik>
                            </Segment>
                        }
                        {!addQuestion && selectedQuiz.questions.map((question, index) => {
                            return <>
                                <Segment secondary clearing>
                                    <Label content={index + 1} circular size='medium' />
                                    <Header content={question.text} style={{ "display": "inline", "margin-left": "10px" }} />
                                    <Button type='button' icon='trash' basic color='red' floated='right' onClick={() => quizStore.removeQuestion(id, index).catch(error => console.log(error))} />
                                    <Header sub content={`${question.points} points`} floated='right' color='green' />
                                    <br /><br />
                                    {question.answers.map(answer => {
                                        return <Segment key={answer.text} size='tiny' color={answer.isCorrect ? 'green' : 'red'} >
                                            <span>
                                                {answer.text}
                                            </ span>{answer.isCorrect && <Icon name='check' color='green' />}
                                        </Segment>
                                    })}
                                </Segment>
                            </>
                        })}
                    </Segment>
                </Grid.Column>
            </Grid>
            <Confirm
                open={openConfirm}
                header='Delete quiz'
                content='This action cannot be undone. Are you sure?'
                cancelButton='Cancel'
                confirmButton="Delete"
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => quizStore.deleteQuiz(id)}
            />
        </>
    )
})