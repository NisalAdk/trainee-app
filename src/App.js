
import React, { useState, useEffect, Component} from 'react';
import Stack from '@mui/material/Stack';
import './App.css';

import Userlist from './component/UserList';
import TrainingList from './component/TrainingList';
import { Tabs, Tab } from '@mui/material';
import Calendar from './component/Calendar'


function App() {
  const [value, setValue] = useState('one');
  const tabChange = (event, value) => {
    setValue(value);
  };
  return (
    <div className="App">
     <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" > 
        <Tabs value={value} onChange={tabChange} variant="scrollable" >
          <Tab value="Users" label="UserList" display="flex"/>

          <Tab value="Trainings" label="TrainingList" display="flex" />
          <Tab value="Calendar" label="Calendar" display="flex" />

          </Tabs>
          </Stack>
          {value === 'Users' && <Userlist/>}
          {value === 'Trainings' && <TrainingList/>}
          {value === 'Calendar' && <Calendar/>}
          
    </div>
  );
}

export default App;
