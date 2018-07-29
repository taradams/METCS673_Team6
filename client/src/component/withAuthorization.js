import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      axios.get('/api/user')
      .then(
        res => {
        if (!authCondition(res)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return this.props.session ? <Component /> :null;
    }
  }
  
  const mapStateToProps = (state) => ({
    session: state.sessionState,
  });

  return compose(
  withRouter,
  connect(mapStateToProps),
)(WithAuthorization);
}

export default withAuthorization;
