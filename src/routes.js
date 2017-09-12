import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './js/Login/stand-alone';
import AdminPortal from './js/AdminPortal/stand-alone';
import CreatePolicy from './js/CreatePolicy/stand-alone';
import CustomerPortal from './js/CustomerPortal/stand-alone';
import NotFound from './js/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/admin" component={AdminPortal} />
      <Route path="/create/:address" component={CreatePolicy} />
      <Route path="/customer/:address" component={CustomerPortal} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
