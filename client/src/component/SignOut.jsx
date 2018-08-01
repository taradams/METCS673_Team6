import React from 'react';
import { dropUser } from '../actions/actions';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as routes from '../constants/routes';

class SignOutButton extends React.Component {
  constructor(props) {
  super(props)
  this.signOut = this.signOut.bind(this)
  }

  signOut(event) {
    axios.get('/api/logout')
    .then(res => {
      console.log(res)
      this.props.history.push(routes.SIGN_IN)
      this.props.dropUser()
    });
  }

  render() {
    return (
      <button type="button" onClick={this.signOut}>
        Sign Out
      </button>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}
//connects redux actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dropUser: dropUser,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignOutButton));
