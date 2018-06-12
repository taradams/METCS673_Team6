import React from "react";
import "./Card.css";
import TextareaAutosize from 'react-autosize-textarea';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            addCard: this.props.addCard ? this.props.addCard : false
        };
    }

    //props 
    render() {
        const textAreaStyle = {
            resize: "none",
            width: "100%",
            boxSizing: "border-box",
            borderRadius: 2,
            border: "none"
        };
        return (
            <div className="card">
                <div className="card-body">
                    {this.state.addCard ? 
                        <div>
                            <TextareaAutosize rows={3} style={textAreaStyle}/>
                            <button type="button" className="btn btn-success">Add</button>
                        </div>
                        :
                        this.props.card.content
                    }
                </div>
            </div>
        );
    }
}