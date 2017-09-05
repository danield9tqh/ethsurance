import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './js/Main';
import NotFound from './js/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
