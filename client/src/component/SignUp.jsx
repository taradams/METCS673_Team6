import React from 'react';
import axios from 'axios';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { INITIAL_STATE } from '../reducers/SignUp';

/*const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});*/

class SignUpForm extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      first_name: '',
      last_name: '',
      email:'',
			password: '',
			confirmPassword: ''
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
		console.log('sign-up handleSubmit, email: ');
		console.log(this.state.email);
    event.preventDefault();
    
    const {
      history,
    } = this.props

		//request to server to add a new username/password
		axios.post('/api/createaccount', {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					/*this.setState({ //redirect to login page
          });*/
          history.push(routes.PROJECT_MANAGER);
				} else {
					console.log('account with this email already exists')
				}
			}).catch(error => {
				console.log('signup error: ');
				console.log(error);

			});
  }
  


render() {
	return (
		<div className="SignupForm">
			<h4>Sign up</h4>
			<form className="form-horizontal">
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="username">Username</label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							value={this.state.username}
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
						type="submit"
					>Sign up</button>
				</div>
			</form>
		</div>

	)
}
}
export default SignUpForm;
