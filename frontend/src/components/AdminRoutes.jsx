import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({children}) => {

  const {isLoggedin} = useSelector(state=>state.auth);

  if(isLoggedin){
    return children;
  }else{
    return <Navigate to="/dashboard" />;
  }
}

export default AdminRoutes
