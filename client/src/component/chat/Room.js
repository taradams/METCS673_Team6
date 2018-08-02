import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import Poster from './Poster';
import './Room.css';
import { sendMessage, retrieveMessages } from '../../api/chat';
import { receiveUpdate, onUpdate } from '../../api/socket';
import axios from 'axios';
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
        const content = {content:data, author:this.props.session.first_name};
        axios.post('/api/chat',{content})
        .then(res => {
          console.log(res.data)
          this.state.chat_log.push(res.data);
          onUpdate();
          this.setState({chat_log:this.state.chat_log});
        }); 
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
    session: state.sessionState
  }
}

export default connect(mapStateToProps,null)(Room);
