import React from 'react';

import { auth } from '../firebase';

class SignOutButton extends React.Component {
  render() {
    return (
      <button type="button" onClick={auth.doSignOut}>
        Sign Out
      </button>
    )
  }
}

export default SignOutButton;
