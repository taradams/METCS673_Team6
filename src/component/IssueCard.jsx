import React from 'react';
import './IssueCard.css'

class IssueCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <div className="IssueCard">
            <h5>{this.props.issue.title}</h5>
            <div className="horizontal-line" />
            <p>{this.props.issue.details}</p>
        </div>
    )
    }
}

export default IssueCard;