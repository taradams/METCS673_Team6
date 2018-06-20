import React, { Component } from 'react';
import './App.css';

import Columns from './container/Columns';
import Page from './component/Page';
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

        <Page />
     </div>
   );
  }
}

export default App;
