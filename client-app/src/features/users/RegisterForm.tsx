import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/Store';
import * as Yup from 'yup';
import ValidaitonErrors from '../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik initialValues={{ userName: '', displayName: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.regsiter(values).catch(error =>
                setErrors({ error })
            )}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >

            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (

                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='username' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidaitonErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}
                     loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})