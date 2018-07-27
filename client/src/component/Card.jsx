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

        const { isDragging, connectDragSource } = this.props;
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
        return (connectDragSource && connectDragSource(
            toRender
        ));
    }
}

export default DragSource(Types.CARD, cardSource, collect)(Card);