import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PasswordForgetLink } from '../component/PasswordForget';
import { auth } from '../firebase/auth';
import * as routes from '../constants/routes';
import { INITIAL_STATE } from '../reducers/SignIn';
import SignInForm from '../component/SignIn';
import './SignInPage.css';

class SignInPage extends React.Component {
    render() {
        return (
            <div className="page">
                <h1 className="title">Sign In to Elmo</h1>
                <SignInForm history={this.props.history} />
                <p className="no_account">
                    Don't have an account?
                    <Link to={routes.SIGN_UP} className="link">Sign Up</Link>
                </p>
          </div>
        )
    }
}

export default withRouter(SignInPage);
