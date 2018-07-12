import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import Navigation from './Navigation.js';
import PasswordForgetPage from '../component/PasswordForget';
import LandingPage from '../component/Landing';
import SignUpPage from '../component/SignUp';
import SignInPage from './SignInPage';
import AccountPage from '../component/Account';
import ProjectManagerPage from './ProjectManager';
import * as routes from '../constants/routes';
import withAuthentication from '../component/withAuthentication';
import IssueTrackerPage from '../component/IssueTracker';
import ChatPage from '../component/chat/Chat';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

class Page extends React.Component {

  render() {
    return (
      <div>
      <Router>
        <div>
          <Navigation />
          <hr/>
            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
            <Route exact path={routes.PROJECT_MANAGER} component={() =>
              <DragDropContextProvider backend={HTML5Backend}>
                <ProjectManagerPage />
              </DragDropContextProvider>} />
            <Route exact path={routes.ISSUE_TRACKER} component={() => <IssueTrackerPage />} />
            <Route exact path={routes.CHAT} component={() => <ChatPage />} />
        </div>
      </Router>
    </div>);
  }
}

export default withAuthentication(Page);
