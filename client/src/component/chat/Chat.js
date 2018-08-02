import React, {Component} from 'react';
import Tab from './Tab';
import withAuthorization from '../withAuthorization';
class ChatPage extends Component{
    render() {
        return (
            <div>
                <div>
                    <Tab />
                </div>
            </div>
        );
    }
}

const authCondition = (user) => !!user;


export default withAuthorization(authCondition)(ChatPage);
