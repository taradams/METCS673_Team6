import React from "react";
import "./Card.css";
import EditableLabel from 'react-inline-editing';//another lib for inline editing
import { DragSource, DropTarget } from 'react-dnd';
import Types from "../constants/types";
import { findDOMNode } from 'react-dom';
import CardModal from './CardModal'; // Import SimpleModal component
import PropTypes from 'prop-types';


const cardSource = {
    beginDrag(props) {
        const item = {
            card: props.card,
            index: props.index,
            localDeleteHandler: props.localDeleteHandler
        };
        return item;
    }
    
};

const cardTarget = {

    hover(props, monitor, component) {
        if (!component) {
            return null;
        }
        const item = monitor.getItem()
        const dragIndex = item.index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(
			component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = (clientOffset).y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
        }

        if (item.card.status === props.card.status) {
            props.moveCard(dragIndex, hoverIndex);
            monitor.getItem().index = hoverIndex;
        } else {
            //props.moveCard(item.card, props.card.status, hoverIndex);
            //move card to different column with index
        }

        // props.moveCard(dragIndex, hoverIndex);

        // monitor.getItem().index = hoverIndex
    }      
}

function collectDropTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()        
    };
}

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
            //new stuff for modal
            showModal: false,
            titleInput: this.props.card.content,
            descriptionInput: this.props.card.details,
            userInput: this.props.card.user,//??? (works)
            id: this.props.card.id,
        };

        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);   
        
        //new stuff for modal
        this.handleToggleModal =this.handleToggleModal.bind(this);
        this.handleEditIssueTitle = this.handleEditIssueTitle.bind(this);
        this.handleEditIssueDescription = this.handleEditIssueDescription.bind(this);
        this.handleAssignUser = this.handleAssignUser.bind(this);
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

    handleEditIssueTitle(title){
        this.setState({
            showModal: false,
            titleInput: title,
        });
    }

    handleEditIssueDescription(description){
        this.setState({
            showModal: false,
            descriptionInput: description,
        });
    }

    handleAssignUser(user){
        this.setState({
            showModal: false,
            userInput: user,
        });
    }

    //props 
    render() {
        // new stuff for modal
        const { showModal } = this.state;
        //new stuff for modal

        const { isDragging, connectDragSource, connectDropTarget } = this.props;
        const toRender = !isDragging ? 
            (<div className="card">
            <div className="card-body">
                {
                    // this.props.card.content
                    this.state.titleInput
                }
                <button type="button" style={{float: "right"}} onClick={this.onClickDelete}  className="btn">X</button>
                {/* new modal stuff */}
                <button
                    type="button"
                    className="cardModalButton"
                    onClick={() => this.handleToggleModal()}
                >
                {/* Modal */}
                <i className="fas fa-edit"></i>
                </button>
                {showModal &&
                    <CardModal 
                    onCloseRequest={() => this.handleToggleModal()} 
                    // cardTitle={this.props.card.content} 
                    cardTitle={this.state.titleInput}
                    // cardID={this.props.card.id}
                    cardID={this.state.id}
                    // cardDescription={this.props.card.details}
                    cardDescription={this.state.descriptionInput}
                    onEditIssueTitle={this.handleEditIssueTitle}
                    onEditIssueDescription={this.handleEditIssueDescription}
                    onAssignUser={this.handleAssignUser}
                    />}
                    {/* {console.log(this.props.card.id)} */}
                {/* new modal stuff */}
                <br></br>
                <p><b>{this.state.userInput}</b></p>
            </div>
            </div>)
            :
            <div/>
        return (connectDragSource && connectDropTarget && connectDragSource(connectDropTarget(
            toRender
        )));
    }
}

Card.propTypes = {
    sheet: PropTypes.object,
    classes: PropTypes.object,
  };

const dropTarget = DropTarget(Types.CARD, cardTarget, collectDropTarget)(Card);
export default DragSource(Types.CARD, cardSource, collect)(dropTarget);   

