import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';

export default observer(function PlayGameHome(){

    function handleFormSubmit(values: any) {
        console.log(values);
    }

    return (
        <Segment clearing>
            <Header content='Enter Game Pin' color='black' />
            <Formik 
                enableReinitialize 
                initialValues={{}} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='PIN' name='gamePin' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            positive type='submit' content='Submit' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})