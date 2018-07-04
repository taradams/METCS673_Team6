import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import Poster from './Poster';
import './Room.css';

export default class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'General Chat Room',
            chat_log: []
        };
        this.handler = this.handler.bind(this);
    }

    handler(data) {
        const previous_chat_log = this.state.chat_log;
        previous_chat_log.push(data);
        this.setState({ chat_log: previous_chat_log })
        console.log(this.state.chat_log);
        console.log(this.previous_chat_log);
    }

    render() {
        return (
            <div>
                <div className="chat_title">
                    {this.state.title}
                </div>
                <div className="chat_log">
                    {
                        this.state.chat_log.map((message) => {
                            return (
                                <div>
                                    <Message text={message} />
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <Poster handlerFromParent={this.handler} />
                </div>
            </div>
        );
    }
}