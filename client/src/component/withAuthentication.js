import React from 'react';
import {connect} from 'react-redux';
import { getUser } from '../actions/actions';
import axios from 'axios';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const {getUser} = this.props;
      axios.get('/api/user')
      .then(res => {
        if(res.status != 200) {
          getUser(res.data)
        }
        else {
          getUser(null)
        }
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    getUser: getUser,
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;
