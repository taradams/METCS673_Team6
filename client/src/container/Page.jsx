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
import Room from '../component/chat/Room.js';

import './Page.css';

class Page extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            show_chat: false,
            show_on_left: true /*true is pmt, false is issue tracker*/
        }
        this.chat_handler = this.chat_handler.bind(this);
        this.pmt_handler = this.pmt_handler.bind(this);
        this.issue_tracker_handler = this.issue_tracker_handler.bind(this);
    }

    chat_handler() {
        this.setState({ show_chat: !this.state.show_chat });
    }

    pmt_handler() {
        this.setState({ show_on_left: true});
    }

    issue_tracker_handler() {
        this.setState({ show_on_left: false });
    }

    render() {
        return (
            <div>
                <Router>
                    <div className="routedPage">
                    <div className="navbar">
                        <Navigation chat_handler={this.chat_handler} pmt_handler={this.pmt_handler} issue_tracker_handler={this.issue_tracker_handler} />
		    </div>
                    <div className="canvas">
                                <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
                                <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
                                <div className="products">
                                    {this.state.show_on_left ?
                                        (this.state.show_chat ?
                                            <div className="flex_box">
                                                <div className="pmt_component">
                                                    <ProjectManagerPage />
                                                </div>
                                                <div className="chat_component" >
                                                    <Room />
                                                </div>
                                            </div>
                                            :
                                            <div className="flex_box">
                                                <div className="pmt_lonely">
                                                    <ProjectManagerPage />
                                                </div>
                                            </div>
                                        ) : (this.state.show_chat ?
                                            <div className="flex_box">
                                                <div className="pmt_component">
                                                    <IssueTrackerPage />
                                                </div>
                                                <div className="chat_component" >
                                                    <Room />
                                                </div>
                                            </div>
                                            :
					    <div className="flex_box">
                                                <div className="pmt_lonely">
                                                    <IssueTrackerPage />
                                                </div>
					    </div>
                                        )
                                    }
                                </div>
		    </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default withAuthentication(Page);
