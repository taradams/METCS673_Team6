import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './Navigation.css'

import SignOutButton from '../component/SignOut';
import * as routes from '../constants/routes';


class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      session: props.session
    };
  }

  componentWillReceiveProps(nextProps) {
        this.setState({
            session: nextProps.session
        });
  }
  render() {
    console.log(this.state.session)
    const NavigationAuth = () => (
      <ul>
        <li><Link to={routes.PROJECT_MANAGER}>Project Manager</Link></li>
        <li><Link to={routes.ISSUE_TRACKER}>Issue Tracker</Link></li>
        <li><Link to={routes.CHAT}>Chat</Link></li>
        <li><SignOutButton /></li>
      </ul>);

    const NavigationNonAuth = () => (
      <ul>
        <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
      </ul>);

    return (
    <div>
      { this.state.session
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
