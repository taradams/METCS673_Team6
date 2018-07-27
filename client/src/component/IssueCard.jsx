import React from 'react';
import './IssueCard.css';
import IssueCardModal from './IssueCardModal';
import { ENGINE_METHOD_DIGESTS } from 'constants';

class IssueCard extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
        showModal: false,//new stuff for modal
        titleInput: this.props.issue.title,
        descriptionInput: this.props.issue.details,
        userInput: this.props.issue.user,
        id: this.props.issue.id,
    };

    //new modal method
    this.handleToggleModal = this.handleToggleModal.bind(this);
    // this.handleEditIssue = this.handleEditIssue.bind(this); //only worked if you edited both the title and the description
    this.handleEditIssueTitle = this.handleEditIssueTitle.bind(this);
    this.handleEditIssueDescription = this.handleEditIssueDescription.bind(this);
    this.handleAssignUser = this.handleAssignUser.bind(this);
    }

    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleEditIssue(title, description, user){
        this.setState({
            showModal: false,
            titleInput: title,
            descriptionInput: description,
            userInput: user 
        });
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


    render() {
        const { showModal } = this.state;

        return(
        <div className="IssueCard">
            {/* <h5>{this.props.issue.title}</h5>
            <div className="horizontal-line" />
            <p>{this.props.issue.details}</p> */}
            <h5>{this.state.titleInput}</h5>
            <div className="horizontal-line" />
            <p>{this.state.descriptionInput}</p>
            <br></br>
            <br></br>
            <p><b>User: {this.state.userInput}</b></p>
            <button
                type="button"
                className="issueModalButton"
                onClick={() => this.handleToggleModal()}
                >
                {/* Modal */}
                <i className="fas fa-edit"></i>
            </button>
            {showModal &&
                <IssueCardModal 
                onCloseRequest={() => this.handleToggleModal()} 
                cardTitle={this.state.titleInput}
                cardDescription={this.state.descriptionInput}
                cardID={this.state.id}
                // onEditIssue={this.handleEditIssue}/>}
                onEditIssueTitle={this.handleEditIssueTitle}
                onEditIssueDescription={this.handleEditIssueDescription}
                onAssignUser={this.handleAssignUser}
                />}
        </div>
    );
    }
}

export default IssueCard;