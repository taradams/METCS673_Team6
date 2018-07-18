import React from 'react';
import ReactDOM from 'react-dom';
import './Message.css';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        var date = new Date(this.props.message.created_date);
        this.state = (
            {
                meta:
                    this.props.message.author + ' ' +
                    date.toLocaleString()
            }
        )
    }
    render() {
        return (
                <div className="msg">
                <p className="meta"> {this.state.meta} </p>
                <p className="msg"> {this.props.message.content} </p>
                </div>
        )
    }
}