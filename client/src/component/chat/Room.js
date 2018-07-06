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

    componentDidMount() {
        fetch("/api/chat/", {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                this.setState({ chat_log: json });
            }.bind(this));
    }
    
    handler(data) {
        const message = { content: data };
        fetch("/api/chat/", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(message),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Access-Control-Allow-Origin': '*'
            } 
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            this.state.chat_log.push(json);
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
                            console.log(message._id);
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