import React from 'react';
import ReactDOM from 'react-dom';
import './Message.css';
import { connect } from 'react-redux';

class Message extends React.Component {
    constructor(props) {
        super(props);
        var date = new Date(this.props.message.created_date);
        this.state = (
            {
                meta:
                    this.props.message.author + ' ' +
                    date.toLocaleString(),
                colorStyle:{backgroundColor:'#efecec'},
            }
	)
	if(this.props.message.author===(this.props.session.first_name + ' ' + this.props.session.last_name)) {
        this.state.colorStyle={backgroundColor:'#add8e6'}
	}
    }
    render() {
        return (
                <div className="msg" style = {this.state.colorStyle}>
                <p className="meta" style={this.state.colorStyle}> {this.state.meta} </p>
                <p className="msg" style={this.state.colorStyle}> {this.props.message.content} </p>
                </div>
        )
    }
}

function mapStateToProps(state) {
  return {
  session:state.sessionState
  }
}

export default connect(mapStateToProps,null)(Message)
