import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/Store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { ActivitiesByDate } = activityStore

    return (
        <Segment>
            <Item.Group divided>
                {ActivitiesByDate.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity} />
                ))}
            </Item.Group>
        </Segment>
    )
})