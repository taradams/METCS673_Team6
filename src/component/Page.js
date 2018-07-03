import React from 'react';
import {connect} from 'react-redux';

import {BrowserRouter as Router, Route,} from 'react-router-dom';
import Navigation from './Navigation.js';
import PasswordForgetPage from './PasswordForget';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import HomePage from './Home';
import AccountPage from './Account';
import ProjectManagerPage from '../container/ProjectManager';
import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import Chatbox from './Chatbox';
const Page = () => 
  <div>
    <Router>
      <div>
        <Navigation />
        <hr/>
          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          <Route exact path={routes.PROJECT_MANAGER} component={() => <ProjectManagerPage />} />
      </div>
    </Router>
    <Chatbox />
  </div>

export default withAuthentication(Page);
