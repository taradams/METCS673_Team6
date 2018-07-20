import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/fp/isNil';
import './CardModal.css';

class CardModal extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      titleInput: "",
      descriptionInput: "",
      idInput: "",
    }

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.submitChangesButton = this.submitChangesButton.bind(this);  
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

  submitChangesButton(){
    this.setState({
      // id: this.props.cardID,
      idInput: "test id",
      titleInput: this.state.titleInput
    });
    console.log("submit changes btn pushed!");
    console.log("props card id: " + this.props.cardID);
    console.log("state id: " + this.state.titleInput);
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
      const editTask = {overview: this.state.titleInput, details: this.state.descriptionInput};
      fetch("http://localhost:5000/api/tasks/" + this.props.cardID, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(editTask),
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
      cardDescription,
      cardID,
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
            {/* <button type="button" onClick={this.submitChangesButton}>Test BTN</button> */}
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

CardModal.propTypes = {
  onCloseRequest: PropTypes.func,
  classes: PropTypes.object,
  cardTitle: PropTypes.string,
  cardID: PropTypes.string,
  cardDescription: PropTypes.string,
};

export default CardModal;
