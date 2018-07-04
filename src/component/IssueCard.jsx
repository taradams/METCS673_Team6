import React from 'react';
import './IssueCard.css'

function IssueCard(props){
    return(
        <div className="IssueCard">
            <h5>{props.title}</h5>
            <div className="horizontal-line" />
            <p>{props.description}</p>
        </div>
    )
}

export default IssueCard;