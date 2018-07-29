import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/fp/isNil';
import './IssueCardModal.css';
import { EditIssue } from '../api/IssueCardModal';
import { onUpdate } from '../api/socket';

class IssueCardModal extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      titleInput: "",
      descriptionInput: "",
      idInput: "",
      psuedoUsers: ["Alexis", "Fred", "Joey", "Rob", "Tara"],
      selectedUserValue: "",
    }

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleOnEditClick2 = this.handleOnEditClick2.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onCloseRequest();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }

  handleOutsideClick(e) {
    const { onCloseRequest } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }

  handleTitleChange(e){
    this.setState({
        titleInput: e.target.value,
    });
    
    // console.log(this.state.titleInput);
}

handleDescriptionChange(e){
  this.setState({
      descriptionInput: e.target.value
  });
  
  // console.log(this.state.value);
}

// handleOnEditClick() {
//       const editTask = {overview: this.state.titleInput, details: this.state.descriptionInput, assignee: this.state.selectedUserValue};
//       fetch("/api/tasks/" + this.props.cardID, {
//       method: 'PUT',
//       mode: 'cors',
//       body: JSON.stringify(editTask),
//       headers: {
//           "Content-Type": "application/json; charset=utf-8",
//           'Access-Control-Allow-Origin': '*'
//       }
//   })
//       .then(function(response) {
//           return response.json();
//       })
//       .then(function(json) {
//           this.setState({titleInput: this.state.titleInput, descriptionInput: this.state.descriptionInput, selectedValue: this.state.selectedUserValue});                
//           // this.hanldeEditConfirmation();
//           this.handleEditTitleConfirmation();
//           this.handleEditDescriptionConfirmation();
//           this.handleAssignUserConfirmation();
//       }.bind(this));

//       // alert("Submitted!");
//   }

  handleSelectChange(e){
    this.setState({
      selectedUserValue: e.target.value
    });
    // console.log(this.state.selectedValue);
  }

  handleOnEditClick2(){
    const editTask = {overview: this.state.titleInput, details: this.state.descriptionInput, assignee: this.state.selectedUserValue};
    EditIssue(editTask, this.props.cardID, function(json){
      onUpdate();
      this.setState({titleInput: this.state.titleInput, descriptionInput: this.state.descriptionInput, selectedValue: this.state.selectedUserValue});                
      this.handleEditTitleConfirmation();
      this.handleEditDescriptionConfirmation();
      this.handleAssignUserConfirmation();
    }.bind(this));
  }

  hanldeEditConfirmation(){
    if(this.props.onEditIssue || this.state.titleInput !== "" || this.state.descriptionInput !== ""){
      this.props.onEditIssue(this.state.titleInput, this.state.descriptionInput, this.state.selectedValue);
    }
  }

  handleEditTitleConfirmation(){
    if(this.props.onEditIssueTitle && this.state.titleInput !== ""){
      this.props.onEditIssueTitle(this.state.titleInput);
    }
  }

  handleEditDescriptionConfirmation(){
    if(this.props.onEditIssueDescription && this.state.descriptionInput !== ""){
      this.props.onEditIssueDescription(this.state.descriptionInput);
    }
  }

  handleAssignUserConfirmation(){
    if(this.props.onAssignUser && this.state.selectedUserValue !== ""){
      this.props.onAssignUser(this.state.selectedUserValue);
    }
  }


  render () {
    const {
      onCloseRequest,
      cardTitle,
      cardID,
      cardDescription,
    } = this.props;
    
    return (
      <div className="modalOverlay">
        <div
          className="modal-s"
          ref={node => (this.modal = node)}>
          <div className="modalContent">
            <div>
              <textarea 
              className="modal-edit-title" 
              // placeholder={cardTitle} 
              defaultValue= {cardTitle} 
              onChange={this.handleTitleChange}/>
            </div>
            <div>
              <textarea 
              className="modal-edit-description" 
              // placeholder={cardDescription}
              // value={this.state.descriptionInput}
              defaultValue= {cardDescription}
              onChange={this.handleDescriptionChange}/>
            </div>
            {/* <div>card id: {cardID} </div> */}
            <div>
            <select id="selectField" onChange={this.handleSelectChange}>
              <option value="default">Pick a user</option>
              <option value={this.state.psuedoUsers[0]}>{this.state.psuedoUsers[0]}</option>
              <option value={this.state.psuedoUsers[1]}>{this.state.psuedoUsers[1]}</option>
              <option value={this.state.psuedoUsers[2]}>{this.state.psuedoUsers[2]}</option>
              <option value={this.state.psuedoUsers[3]}>{this.state.psuedoUsers[3]}</option>
              <option value={this.state.psuedoUsers[4]}>{this.state.psuedoUsers[4]}</option>
            </select>
            </div>
            <button type="button" className="submitBtn" onClick={this.handleOnEditClick2}>Submit</button>
            {/* <p>{this.state.selectedUserValue}</p> */}
          </div>
        </div>

        <button
          type="button"
          className="closeButton"
          onClick={onCloseRequest}
        >X</button> 
      </div>
    );
  }
}

IssueCardModal.propTypes = {
  onCloseRequest: PropTypes.func,
  classes: PropTypes.object,
  cardTitle: PropTypes.string,
  cardID: PropTypes.string,
  cardDescription: PropTypes.string,
};

export default IssueCardModal;
