import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createorEdit:(activity:Activity)=>void
}

export default function ({ activities, selectedActivity, 
    selectActivity, cancelSelectActivity, editMode, openForm, closeForm,createorEdit }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity}></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}></ActivityDetails>}
                {editMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createorEdit={createorEdit} />
                }
            </Grid.Column>
        </Grid>
    )
}