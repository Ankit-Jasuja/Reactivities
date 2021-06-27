import React, { useEffect, useState } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/Store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);//setting activity to empty initially,
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);//editMode true,activity form will show up
  const [submitting, setSubmiting] = useState(false);


  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])


  function handleSelectActivity(id: string) {
    setselectedActivity(activities.find(z => z.id === id));
  }

  function handleCancelSelectActivity() {
    setselectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateorEditActivity(activity: Activity) {
    setSubmiting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditMode(false);
        setselectedActivity(activity);
        setSubmiting(false);
      })
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setselectedActivity(activity);
        setSubmiting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmiting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(z => z.id !== id)]);
      setSubmiting(false);
    })
  }

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activityStore.activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          editMode={editMode}
          createorEdit={handleCreateorEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
