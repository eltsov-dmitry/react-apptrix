import React, {useState} from 'react';
import {AppBar, Tab, Tabs} from '@mui/material';
import {Link} from 'react-router-dom';

const AppBarCustom = () => {
  const [tabValue, setTabValue] = useState('/');
  return (
    <AppBar>
      <Tabs
        value={tabValue}
        onChange={(event, value)=>setTabValue(value)}
        indicatorColor="secondary"
        textColor="inherit"
      >
        <Tab
          label="Пользователи"
          value="/"
          component={Link}
          to="/"
        />
        <Tab
          label="Задачи"
          value="/issues"
          component={Link}
          to="/issues"
        />
      </Tabs>
    </AppBar>
  );
};

export default AppBarCustom;
