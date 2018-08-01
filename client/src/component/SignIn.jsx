import React from 'react';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { INITIAL_STATE } from '../reducers/SignIn';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getUser } from '../actions/actions';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {INITIAL_STATE};
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const {
      email,
      password,
    } = this.state;
    axios.post('/api/login', {email, password})
      .then(res => {
        console.log(res)
        console.log(res.data)
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.getUser(res.data);
        this.props.history.push(routes.PROJECT_MANAGER);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={this.handleChange}
          type="text"
          name="email"
          placeholder="Email Address"
        />
        <input
          value={this.state.password}
          onChange={this.handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} onClick = {this.handleSubmit} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}
//connects redux actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: getUser,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignInForm));
