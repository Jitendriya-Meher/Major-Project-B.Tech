import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

  const {isLoggedin} = useSelector(state=>state.auth);

  if(isLoggedin){
    return children;
  }else{
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute
