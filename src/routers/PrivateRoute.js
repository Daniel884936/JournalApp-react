import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    component : Component,
    ...rest
}) => {

    //to remember last path
    localStorage.setItem('lastPath', rest.location.pathname);

    return (
        <Route {...rest}
          component ={
              (props) =>
              (isAuthenticated) 
              ? (<Component {...props} />)
              : (<Redirect to="auth/login"/>)
          }        
        />                
    )
}
