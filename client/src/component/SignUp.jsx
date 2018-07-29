import React from 'react';
import axios from 'axios';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { INITIAL_STATE } from '../reducers/SignUp';
import App from '../App.js'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import getUser from '../actions/actions';

class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      INITIAL_STATE
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const {
      first_name,
      last_name,
      email,
      password
    } = this.state

    axios.post(
      'api/createaccount',
      {
        first_name, 
        last_name,
        email,
        password
      }
    )
    .then(
      res => { 
        this.setState(() => ({...INITIAL_STATE }));
        this.props.getUser();
        this.props.history.push(routes.PROJECT_MANAGER);
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    )
    event.preventDefault();
  }

  render() {
    return (
      <div className="SignupForm">
        <h4>Sign up</h4>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="first_name">First Name</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input className="form-input"
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="last_name">Last Name</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input className="form-input"
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                value={this.state.last_name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="email">Email</label>
            </div>
            <div className="col-3 col-mr-auto">
              <input className="form-input"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="password">Password: </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input className="form-input"
                placeholder="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group ">
            <div className="col-7"></div>
            <button
              className="btn btn-primary col-1 col-mr-auto"
              onClick={this.handleSubmit}
              type="submit">Sign up</button>
          </div>
        </form>
      </div>
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
    getUser: getUser,
  }, dispatch);
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignUpForm));
