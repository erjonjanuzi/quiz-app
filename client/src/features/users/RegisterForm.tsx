import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    const [role, setRole] = useState('');

    return (
        role ? (
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '', role: role, error: null }}
                onSubmit={(values) => userStore.register(values).catch(error =>
                    console.log(error.message))}
                validationSchema={Yup.object({
                    firstName: Yup.string().required(),
                    lastName: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().min(8).required(),
                    role: Yup.string().required()
                })}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                        <Header as='h2' content='Sign up to Reactivites' color='teal' textAlign='center' />
                        <MyTextInput name='firstName' placeholder='First Name' />
                        <MyTextInput name='lastName' placeholder='Last Name' />
                        <MyTextInput name='email' placeholder='Email' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        <Button disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting} positive content='Register' type='submit' fluid />
                    </Form>
                )}
            </Formik>
        ) : (
            <>
                <Header as='h1' content='Choose account role' textAlign='center' />
                <Grid textAlign='center'>
                    <Grid.Column width='5'>
                        <Segment textAlign='center'>
                            <Header as='h3' content='Student' />
                            <Icon name='user' size='massive' />
                            <br /><br />
                            <Button animated='vertical' color='teal' onClick={() => setRole('student')}>
                                <Button.Content visible>Student</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='plus' />
                                </Button.Content>
                            </Button>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width='5'>
                        <Segment textAlign='center'>
                            <Header as='h3' content='Teacher' />
                            <Icon name='book' size='massive' />
                            <br /><br />
                            <Button animated='vertical' color='teal' onClick={() => setRole('teacher')}>
                                <Button.Content visible>Teacher</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='plus' />
                                </Button.Content>
                            </Button>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </>
        )
    )
})