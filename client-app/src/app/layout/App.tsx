import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './Navbar';

function App() { 
    const[activities,setActivities]= useState<Activity[]>([]);//setting activity to empty initially,
 
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response =>{
      setActivities(response.data);
    })
  },[])

  return (
    <>
     <NavBar/>
     <Container style={{marginTop:'7em'}}>
     <List>
        {activities.map((activity)=>(
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
        </List>
     </Container>
        
    </>
  );
}

export default App;
