import React from 'react';

import { auth } from '../firebase';

class SignOutButton extends React.Component {
  render() {
    console.log(this.props);
    return (
      <button type="button"onClick={this.props.auth.doSignOut}>
        Sign Out
      </button>
    )
  }
}

export default SignOutButton;
