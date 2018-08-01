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
            show_chat: false,
            show_on_left: true /*true is pmt, false is issue tracker*/
        };
        this.chat_click = this.chat_click.bind(this);
        this.pmt_click = this.pmt_click.bind(this);
        this.issue_tracker_click = this.issue_tracker_click.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            authUser: nextProps.authUser
        });
    }

    chat_click(e) {
        if (this.state.show_chat) {
            this.setState({ show_chat: false });
        } else {
            this.setState({ show_chat: true });
        }
        this.props.chat_handler(this.state.show_chat);
    }

    pmt_click(e) {
        this.setState({ show_on_left: true });
        this.props.pmt_handler(this.state.show_on_left);
    }

    issue_tracker_click(e) {
        this.setState({ show_on_left: false });
        this.props.issue_tracker_handler(this.state.show_on_left);
    }

    render() { 
        const NavigationAuth = () => (
            <ul className="nav_bar">
                <li><input type="submit" value="Project Manager" className="nav_button" onClick={this.pmt_click} /></li>
                <li><input type="submit" value="Issue Tracker" className="nav_button" onClick={this.issue_tracker_click} /></li>
                <li><input type="submit" value="Chat" className="nav_button" onClick={this.chat_click}/></li>
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