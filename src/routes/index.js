import React from 'react';
import {Switch} from 'react-router-dom';
import  RouteWrapper  from './Route';
import Signin from '../pages/Signin';
import SingUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile/index'
import Custumers from '../pages/Custumers';


function RoutesApp() {
    return (
        <Switch>
            <RouteWrapper exact path="/" component={Signin} />
            <RouteWrapper exact path='/register' component={SingUp} />
            <RouteWrapper exact path='/dashboard' component={Dashboard} isPrivate/>
            <RouteWrapper exact path='/profile' component={Profile} isPrivate />
            <RouteWrapper exact path='/custumers' component={Custumers} isPrivate />
        </Switch>
    );
  }
  
  export default RoutesApp;