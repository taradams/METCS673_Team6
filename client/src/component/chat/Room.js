import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import Poster from './Poster';
import './Room.css';
import { sendMessage, retrieveMessages } from '../../api/chat';
import { receiveUpdate, onUpdate } from '../../api/socket';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class Room extends React.Component {

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
            this.setState({ chat_log: json });
        }.bind(this));
    }

    componentDidMount() {
        this.getMessages();
	const objDiv = document.getElementById('chat_messages');
	objDiv.scrollTop = objDiv.scrollHeight;
    }
    
    handler(data) {
        const message = { content: data, author: this.props.session.first_name + " " + this.props.session.last_name };
        sendMessage(message, function(json) {
            this.state.chat_log.push(json);
            onUpdate();
            this.setState({ chat_log: this.state.chat_log }); 
        }.bind(this)); 
    }
    
    componentDidUpdate() {
        // get the messagelist container and set the scrollTop to the height of the container
        const objDiv = document.getElementById('chat_messages');
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    
    render() {
        const chat_log = this.state.chat_log.map((message,i) => {
            return (
		<Message key = {message._id} message = {message}/>
	    );
	});
	return (
            <div>
                <div className="chat_title">
                    {this.state.title}
                </div>
		<div className = 'chat_log' id = 'chat_messages'>
		    {chat_log}
		</div>
                <div>
                    <Poster handlerFromParent={this.handler} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    session: state.sessionState,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
  },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);