import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import Navigation from './Navigation';
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
import Room from '../component/chat/Room.js';

import './Page.css';

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: true }
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Navigation />
                        <div className="canvas">
                            <DragDropContextProvider backend={HTML5Backend}>
                            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
                            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
                            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
                            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
                            <Route exact path={routes.PROJECT_MANAGER} component=
                                {() =>
                                    <div className="pmt_lonely">
                                        {/*<DragDropContextProvider backend={HTML5Backend}>*/}
                                            <ProjectManagerPage />
                                        {/*</DragDropContextProvider>*/}
                                    </div>
                                }
                            />
                            <Route exact path={routes.ISSUE_TRACKER} component={() => <IssueTrackerPage />} />
                            <Route exact path={routes.CHAT} component=
                                {() =>
                                    <div className="flex_box">
                                        <div className="pmt_component">
                                            {/*<DragDropContextProvider backend={HTML5Backend}>*/}
                                                <ProjectManagerPage style="margin: 0; padding: 0;"/>
                                            {/*</DragDropContextProvider>*/}
                                        </div>
                                        <div className="chat_component" >
                                            <Room />
                                        </div>
                                    </div>
                                }
                                />
                            </DragDropContextProvider>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default withAuthentication(Page);
