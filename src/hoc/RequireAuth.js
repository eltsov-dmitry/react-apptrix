import React from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import {getToken} from '../use/getters';


const RequireAuth = ({children}) => {
  const location = useLocation();
  const isAuth = !!getToken();

  if (!isAuth) {
    return <Navigate to="/login" state={{location}}/>;
  }
  return children;
};


export default RequireAuth;
