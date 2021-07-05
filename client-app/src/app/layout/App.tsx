import React, { useEffect, useState } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'; 
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/Store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);//setting activity to empty initially,
  const [submitting, setSubmiting] = useState(false);


  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

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
      <NavBar/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activityStore.activities}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
