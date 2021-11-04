import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import UsersCreate from '../pages/UsersCreate';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/dashboard" component={Dashboard} isPrivate />
    <Route exact path="/users" component={Users} isPrivate />
    <Route exact path="/users/create" component={UsersCreate} isPrivate />
  </Switch>
);

export default Routes;
