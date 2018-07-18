import React from "react";
import "./Card.css";
//import InlineEdit from 'react-edit-inline';//library for using inline text editing (didn't work well)
import EditableLabel from 'react-inline-editing';//another lib for inline editing
import { DragSource } from 'react-dnd';
import Types from "../constants/types";
import CardModal from './CardModal'; // Import SimpleModal component
import PropTypes from 'prop-types';



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
            // text: "edit this text!"
            showModal: false,//new stuff for modal
        };

        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);   
        
        //new stuff for modal
        this.handleToggleModal =this.handleToggleModal.bind(this);
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

    // Handle the visibility of the modal.
    // If `state.showModal` is false, sets it to true,
    // if is true, sets it to false.
    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    //props 
    render() {
        // new stuff for modal
        // const { sheet: { classes } } = this.props;
        const { showModal } = this.state;
        //new stuff for modal

        const { isDragging, connectDragSource } = this.props;
        const toRender = !isDragging ? 
            (<div className="card">
            <div className="card-body">
                {
                    this.props.card.content
                }
                <button type="button" style={{float: "right"}} onClick={this.onClickDelete}  className="btn">X</button>
                {/* new modal stuff */}
                <button
                    type="button"
                    className="modalButton"
                    onClick={() => this.handleToggleModal()}
                >
                Modal
                </button>
                {showModal &&
                    <CardModal 
                    onCloseRequest={() => this.handleToggleModal()} 
                    cardTitle={this.props.card.content} 
                    cardID={this.props.card.id}
                    cardDescription={this.props.card.details}/>}
                    {/* {console.log(this.props.card.id)} */}
                {/* new modal stuff */}
            </div>
            </div>)
            :
            <div/>
        return (connectDragSource && connectDragSource(
            toRender
        ));
    }
}

Card.propTypes = {
    sheet: PropTypes.object,
    classes: PropTypes.object,
  };

export default DragSource(Types.CARD, cardSource, collect)(Card);
