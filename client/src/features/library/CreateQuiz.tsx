import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Divider, Grid, Header, Label, Message, Segment } from 'semantic-ui-react';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import NavBar from '../../app/layout/NavBar';
import { subjectOptions } from '../../app/common/options/subjectOptions';
import { pointsOptions } from '../../app/common/options/pointsOptions';
import { timeOptions } from '../../app/common/options/timeOptions';
import { correctOptions } from '../../app/common/options/correctOptions';
import { useStore } from '../../app/stores/store';
import { history } from '../..';
import * as Yup from 'yup';

export default observer(function CreateQuiz() {
    const { quizStore } = useStore();
    const [addQuestion, setAddQuestion] = useState(false);

    const handleAddQuestion = (values: any) => {
        setAddQuestion(false);
        const questionObject = {
            text: values.text,
            points: values.points,
            time: values.time,
            resultHistory: {
                correct: 0,
                incorrect: 0
            },
            answers: [
                {
                    text: values.answer1,
                    isCorrect: values.correct === 'a'
                },
                {
                    text: values.answer2,
                    isCorrect: values.correct === 'b'
                },
                {
                    text: values.answer3,
                    isCorrect: values.correct === 'c'
                },
                {
                    text: values.answer4,
                    isCorrect: values.correct === 'd'
                }
            ]
        }
        quizStore.tempQuestions.push(questionObject);
    }

    const handleRemoveQuestion = (index: number) => {
        quizStore.tempQuestions.splice(index, 1);
    }

    const quizValidationSchema = Yup.object({
        name: Yup.string().required('Question name is required'),
        description: Yup.string().required('Provide a short description'),
        subject: Yup.string().required('Choose a subject'),
    })

    const questionsValidationSchema = Yup.object({
        text: Yup.string().required('Question text is required'),
        points: Yup.string().required('Points are required'),
        time: Yup.string().required('Time is required'),
        answer1: Yup.string().required('Answer required'),
        answer2: Yup.string().required('Answer required'),
        answer3: Yup.string().required('Answer required'),
        answer4: Yup.string().required('Answer required'),
        correct: Yup.string().required('Choose the correct answer'),
    })

    useEffect(() => {

    }, [quizStore.tempQuestions.length])

    return (
        <>
            <NavBar />
            <h1>Create new quiz</h1>
            <Grid>
                <Grid.Column width={8}>
                    <Segment>
                        <Formik
                            initialValues={{ name: '', description: '', subject: '', questions: [], error: null }}
                            onSubmit={(values, { setErrors }) => quizStore.createQuiz(values).then(() => history.push('/library')).catch(error => setErrors({ error: error.response.data }))}
                            validationSchema={quizValidationSchema}
                        >
                            {({ handleSubmit, isValid, dirty, isSubmitting, errors }) => (
                                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                    <MyTextInput name='name' placeholder='Quiz name...' />
                                    <MyTextArea name='description' placeholder='Description' rows={3} />
                                    <MySelectInput name='subject' placeholder='Subject' options={subjectOptions} />
                                    {quizStore.tempQuestions.length > 0 && quizStore.tempQuestions.map((question, index) => {
                                        return <>
                                            <Segment secondary color='pink' clearing>
                                                <Label content={index + 1} circular size='small' />
                                                <Header sub content={question.text} style={{ "display": "inline", "margin-left": "10px" }} />
                                                <Button type='button' icon='trash' basic color='red' floated='right' onClick={() => handleRemoveQuestion(index)} />
                                                <Header sub content={`${question.points} points`} floated='right' color='green' />
                                            </Segment>
                                        </>

                                    })}
                                    {quizStore.tempQuestions.length === 0 &&
                                        <Message content='Minimum 1 question required' color='red'/>}
                                    <Button content='Add question' icon='plus' labelPosition='left' fluid color='blue' basic type='button'
                                        onClick={() => setAddQuestion(true)}
                                    />
                                    <ErrorMessage
                                        name='error' render={() =>
                                            <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                                    />
                                    <Divider />
                                    <Button
                                        disabled={isSubmitting || !dirty || !isValid || quizStore.tempQuestions.length < 1}
                                         type='submit' content='Save' color='pink' />
                                </Form>
                            )}
                        </Formik>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    {addQuestion &&
                        <Segment>
                            <Formik
                                initialValues={{ text: '', points: '', time: '', error: null }}
                                onSubmit={(values) => handleAddQuestion(values)}
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
                </Grid.Column>
            </Grid>
        </>
    )
})