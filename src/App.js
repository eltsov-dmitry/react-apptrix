import React from 'react';
import './scss/style.scss';
import {Route, Routes} from 'react-router-dom';
import Issues from './components/Issues';
import Users from './components/Users';
import {connect} from 'react-redux';
import Login from './components/Login';
import RequireAuth from './hoc/RequireAuth';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <RequireAuth><Users/></RequireAuth>
        }/>
        <Route path="/issues" element={
          <RequireAuth><Issues/></RequireAuth>
        }/>
        <Route path="/issues/:timesheetsID" element={
          <RequireAuth><Issues/></RequireAuth>
        }/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
};

export default connect(null, {})(App);
