import React from 'react';
import './IssueCard.css';
import IssueCardModal from './IssueCardModal';

class IssueCard extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
        showModal: false,//new stuff for modal

    };

    //new modal method
    this.handleToggleModal =this.handleToggleModal.bind(this);

    }

    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }


    render() {
        const { showModal } = this.state;

        return(
        <div className="IssueCard">
            <h5>{this.props.issue.title}</h5>
            <div className="horizontal-line" />
            <p>{this.props.issue.details}</p>
            <button
                type="button"
                className="issueModalButton"
                onClick={() => this.handleToggleModal()}
                >
                {/* Modal */}
                <i class="fas fa-edit"></i>
                </button>
                {showModal &&
                    <IssueCardModal 
                    onCloseRequest={() => this.handleToggleModal()} 
                    cardTitle={this.props.issue.title}
                    cardDescription={this.props.issue.details}
                    cardID={this.props.issue.id}/>}
        </div>
    )
    }
}

export default IssueCard;