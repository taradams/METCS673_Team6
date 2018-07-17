import React from 'react';
import { withRouter } from 'react-router-dom';
import SignUpForm from '../component/SignUp';

class SignUpPage extends React.Component {
    render() {
        return (
            <div>
                <h1>SignUp</h1>
                <SignUpForm history={this.props.history}/>
          </div>
        )
    }
}

export default withRouter(SignUpPage);
