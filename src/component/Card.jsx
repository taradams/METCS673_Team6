import React from "react";
import "./Card.css";

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            addCard: this.props.addCard ? this.props.addCard : false
        };
    }

    //props 
    render() {
        return (
            <div className="card task box">
                <div className="card-body">
                    {
                        this.props.card.content
                    }
                </div>
            </div>
        );
    }
}