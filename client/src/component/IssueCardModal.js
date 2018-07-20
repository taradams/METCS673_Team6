import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/fp/isNil';
import './IssueCardModal.css';

class IssueCardModal extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      titleInput: "",
      descriptionInput: "",
      idInput: "",
    }

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleOnEditClick = this.handleOnEditClick.bind(this);
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

handleOnEditClick() {
      const editTaskTitle = {overview: this.state.titleInput, details: this.state.descriptionInput};
      fetch("/api/tasks/" + this.props.cardID, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(editTaskTitle),
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Access-Control-Allow-Origin': '*'
      }
  })
      .then(function(response) {
          return response.json();
      })
      .then(function(json) {
          this.setState({titleInput: ""});                
      }.bind(this));

      alert("Submitted!");

  }



  render () {
    const {
      onCloseRequest,
      cardTitle,
      cardID,
      cardDescription
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
              // value={this.state.titleInput} 
              onChange={this.handleTitleChange}>{cardTitle}</textarea>
            </div>
            <div>
              <textarea 
              className="modal-edit-description" 
              // placeholder={cardDescription}
              // value={this.state.descriptionInput}
              onChange={this.handleDescriptionChange}>{cardDescription}</textarea>
            </div>
            <div>card id: {cardID} </div>
            <button type="button" className="submitBtn" onClick={this.handleOnEditClick}>Submit</button>
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
