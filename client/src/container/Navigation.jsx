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
            session: this.props.session,
            show_chat: false,
            show_on_left: true /*true is pmt, false is issue tracker*/
        };
        this.chat_click = this.chat_click.bind(this);
        this.pmt_click = this.pmt_click.bind(this);
        this.issue_tracker_click = this.issue_tracker_click.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            session: nextProps.session
        });
    }

    chat_click() {
        this.props.chat_handler();
    }

    pmt_click() {
        this.props.pmt_handler();
    }

    issue_tracker_click() {
        this.props.issue_tracker_handler();
    }

    render() { 
        const NavigationAuth = () => (
            <ul className="nav_bar">
                <li><input type="submit" value="Project Manager" className="nav_button" onClick={this.pmt_click} /></li>
                <li><input type="submit" value="Issue Tracker" className="nav_button" onClick={this.issue_tracker_click} /></li>
                <li><button type="submit" value="Chat" className="nav_button" onClick={this.chat_click}>
		<i class="far fa-comment"></i>    
		</button></li>
                <li className="sign_out_button"><SignOutButton /></li>
            </ul>
        );

        const NavigationNonAuth = () => (
            <ul className="nav_bar">
                <li><Link className="nav_button" to={routes.SIGN_IN}>Sign In</Link></li>
            </ul>);

        return (
            <div>
                {!!this.state.session
                    ? <NavigationAuth />
                    : <NavigationNonAuth />
                }
            </div>)
    }
}

const mapStateToProps = (state) => ({
    session: state.sessionState,
});

export default connect(mapStateToProps)(Navigation);
