import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
}

export default function ({ activities }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList activities={activities}></ActivityList>
            </Grid.Column>
        </Grid>
    )
}