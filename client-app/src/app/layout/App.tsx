import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() { 
    const[activities,setActivities]= useState<Activity[]>([]);//setting activity to empty initially,
    const[selectedActivity,setselectedActivity]= useState<Activity|undefined>(undefined);

 
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response =>{
      setActivities(response.data);
    })
  },[])


  function handleSelectActivity(id:string){
    setselectedActivity(activities.find(z=>z.id===id));
  }

  function handleCancelSelectActivity(){
    setselectedActivity(undefined);
  }

  return (
    <>
     <NavBar/>
     <Container style={{marginTop:'7em'}}>
     <ActivityDashboard
      activities={activities}
      selectedActivity={selectedActivity}
      selectActivity={handleSelectActivity}
      cancelSelectActivity={handleCancelSelectActivity}
      / >
     </Container>
    </>
  );
}

export default App;
