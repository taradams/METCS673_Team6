import React from 'react';
import ReactDOM from 'react-dom';
import './Message.css';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = (
            { meta: 'test_user' + ' ' + 'test_time' }
        )
    }
    render() {
        return (
                <div className="msg">
                    <p> {this.props.text} </p>
                </div>
        )
    }
}