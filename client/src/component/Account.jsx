import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import PasswordForgetForm from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

class AccountPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Account:{this.props.authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);
