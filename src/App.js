import React, { Component } from 'react';
import './App.css';
import Columns from './container/Columns';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import Navigation from './component/Navigation';
import LandingPage from './component/Landing';
import SignUpPage from './component/SignUp';
import SignInPage from './component/SignIn';
import PasswordForgetPage from './component/PasswordForget';
import HomePage from './component/Home';
import AccountPage from './component/Account';
import * as routes from './constants/routes';
import withAuthentication from './component/withAuthentication';

class App extends Component {

  render() {
    return (
      <div className="App">
      
        <Router>
          <div>
            <Navigation />

            <hr/>
            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
            <Route exact path={routes.HOME} component={() => <HomePage />} />
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          </div>
        </Router>
        <div className="row">
          <Columns/>
        </div>
      </div>
   );
  }
}

export default withAuthentication(App);
