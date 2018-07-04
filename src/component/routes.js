import React from 'react';
import { Route } from 'react-router-dom';
import App from './containers/App';
import Page from './Page.js'
export default (
  <Route path="/" component={App}>
     <Route exact path="/" component={Page} />
     <Route path="/:id" component={Page} />
  </Route>
)
