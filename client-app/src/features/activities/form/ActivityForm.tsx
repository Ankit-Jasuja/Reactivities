import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/Store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOption } from '../../../app/common/options/CategoryOption';

export default observer(function ActivityForm() {

    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();


    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    const validationSchema = yup.object({
        title: yup.string().required('The activity title is required'),
        description: yup.string().required('The activity description is required'),
        category: yup.string().required(),
        date: yup.string().required(),
        venue: yup.string().required(),
        city: yup.string().required()

    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))//activity! implies activity can be undefined as well
    }, [id, loadActivity])

    // function handleSubmit() {
    //     if (activity.id.length === 0) {
    //         let newActivity = { ...activity, id: uuid() };
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    //     }
    //     else {
    //         updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    //     }
    // }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     console.log(event);
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value })
    // }
    if (loadingInitial) return <LoadingComponent content='Loading Activity....' />

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='Off'>
                        <MyTextInput name='title' placeholder='Title'/>
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOption} placeholder='Category' name='category' />
                        <MyTextInput placeholder='Date' name='date' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})