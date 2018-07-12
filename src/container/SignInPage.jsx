import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PasswordForgetLink } from '../component/PasswordForget';
import { auth } from '../firebase/auth';
import * as routes from '../constants/routes';
import { INITIAL_STATE } from '../reducers/SignIn';
import SignInForm from '../component/SignIn';

class SignInPage extends React.Component {
    render() {
        return (
            <div>
                <h1>SignIn</h1>
                <SignInForm history={this.props.history} />
                <p>
                    <Link to="/pw-forget">Forgot Password?</Link>
                </p>
                <p>
                    Don't have an account?
                    <Link to={routes.SIGN_UP}>Sign Up</Link>
                </p>
          </div>
        )
    }
}

export default withRouter(SignInPage);
