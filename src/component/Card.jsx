import React from "react";
import "./Card.css";
//import InlineEdit from 'react-edit-inline';//library for using inline text editing (didn't work well)
import EditableLabel from 'react-inline-editing';//another lib for inline editing


export default class Card extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            addCard: this.props.addCard ? this.props.addCard : false,
            text: "edit this text!"
        };

        //experimental code below
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);        
    }

    _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
    }

    onClickDelete() {
        if (this.props.deleteHandler) {
            this.props.deleteHandler(this.props.card.id);
        }
    }

    //props 
    render() {
        return (
            <div className="card task box">
                <div className="card-body">
                    {
                        this.props.card.content
                    }
                    <button type="button" style={{float: "right"}} onClick={this.onClickDelete}  className="btn">X</button>
                </div>
                <div>
                    <EditableLabel 
                        text= {this.state.text}
                        labelClassName='myLabelClass'
                        inputClassName='myInputClass'
                        inputWidth='200px'
                        inputHeight='25px'
                        //inputMaxLength='50'
                        labelFontWeight='bold'
                        inputFontWeight='bold'
                        onFocus={this._handleFocus}
                        onFocusOut={this._handleFocusOut}
                    />   
                    {
                        this.props.card.content = this.state.text
                    }                     
                </div>
            </div>
        );
    }
}