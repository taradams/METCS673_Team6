import React from 'react';
import {connect} from 'react-redux';

const Chatbox = ({authUser}) =>
  <div>
    { authUser
        ? <ChatboxAuth />
        : <ChatboxNonAuth />
    }
  </div>

const ChatboxAuth = () =>
  <ul>
    <li>Hi!</li>
  </ul>

const ChatboxNonAuth = () =>
  <h1>Login to Access Chat</h1>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Chatbox);
