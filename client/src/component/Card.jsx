import React from "react";
import "./Card.css";
//import InlineEdit from 'react-edit-inline';//library for using inline text editing (didn't work well)
import EditableLabel from 'react-inline-editing';//another lib for inline editing
import { DragSource } from 'react-dnd';
import Types from "../constants/types";

const cardSource = {
    beginDrag(props) {
        const item = {
            card: props.card
        };
        return item;
    },
    
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            props.localDeleteHandler(props.card.id);
		}
    }
};

function collect(connect, monitor) {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDragSource: connect.dragSource(),
      // You can ask the monitor about the current drag state:
      isDragging: monitor.isDragging()
    };
  }

class Card extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            addCard: this.props.addCard ? this.props.addCard : false,
            text: "edit this text!"
        };

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
        const { isDragging, connectDragSource } = this.props
        const toRender = !isDragging ? 
            (<div className="card task box">
            <div className="card-body">
                {
                    this.props.card.content
                }
                <button type="button" style={{float: "right"}} onClick={this.onClickDelete}  className="btn">X</button>
            </div>
            </div>)
            :
            <div/>
        return (connectDragSource && connectDragSource(
            toRender
        ));
    }
}

export default DragSource(Types.CARD, cardSource, collect)(Card);