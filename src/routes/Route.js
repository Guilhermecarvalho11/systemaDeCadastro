import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { Route,  Redirect } from  "react-router-dom";


function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){

    const { signed, loading } = useContext(AuthContext);
   
    if(loading){
        return(
            <div>
                
            </div>
        )
    }

    if(!signed && isPrivate){
     
        return <Redirect to="/" />
    }

    if(signed && !isPrivate){
      
        return <Redirect to='/dashboard' />
  
    }

    return(
        <Route
        {...rest}
        render={props => (
            <Component {...props} />
        )}
        />
    )
}

export default RouteWrapper;
