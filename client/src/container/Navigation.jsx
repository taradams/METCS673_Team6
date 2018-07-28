import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SignOutButton from '../component/SignOut';
import * as routes from '../constants/routes';

import './Navigation.css';

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authUser: props.authUser,
            bool_toggle: false,
            my_route: routes.CHAT
        };
        this.toggle_chat.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            authUser: nextProps.authUser
        });
    }

    toggle_chat(toggle) {
        if (toggle) {
            this.setState({ my_route: routes.CHAT, bool_toggle: !this.state.bool_toggle });
        } else if (!toggle) {
            this.setState({ my_route: routes.PROJECT_MANAGER, bool_toggle: !this.state.bool_toggle });
        }
    }

    render() { 
        const NavigationAuth = () => (
            <ul className="nav_bar">
                <li><Link className="nav_button" to={routes.PROJECT_MANAGER}>Project Manager</Link></li>
                <li><Link className="nav_button" to={routes.ISSUE_TRACKER}>Issue Tracker</Link></li>
                <li><Link className="nav_button" to={this.state.my_route} onClick={() => { this.toggle_chat(this.state.bool_toggle) }}>Chat</Link></li>
                <li className="sign_out_button"><SignOutButton /></li>
            </ul>
        );

        const NavigationNonAuth = () => (
            <ul className="nav_bar">
                <li><Link className="nav_button" to={routes.SIGN_IN}>Sign In</Link></li>
            </ul>);

        return (
            <div>
                {this.state.authUser
                    ? <NavigationAuth />
                    : <NavigationNonAuth />
                }
            </div>)
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);