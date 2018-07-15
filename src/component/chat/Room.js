import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import Poster from './Poster';
import './Room.css';
import { sendMessage, retrieveMessages } from '../../api/chat';
import { receiveUpdate, onUpdate } from '../../api/socket';

export default class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'General Chat Room',
            chat_log: []
        };
        this.handler = this.handler.bind(this);
        this.getMessages = this.getMessages.bind(this);
        receiveUpdate(() => this.getMessages());
    }

    getMessages() {
        retrieveMessages(function(json) {
            console.log(json);
            this.setState({ chat_log: json });
        }.bind(this));
    }

    componentDidMount() {
        this.getMessages();
    }
    
    handler(data) {
        const message = { content: data };
        sendMessage(message, function(json) {
            this.state.chat_log.push(json);
            onUpdate();
            this.setState({ chat_log: this.state.chat_log }); 
        }.bind(this)); 
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
                                    <Message key={message._id} text={message.content} />
                                </div>
                            );
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