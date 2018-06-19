import React from "react";
import "./Card.css";

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {

        };
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    onClickDelete() {
        if (this.props.deleteHandler) {
            this.props.deleteHandler(this.props.card.id);
        }
    }

    //props 
    render() {
        return (
            <div className="card task box">
                <div className="card-body">
                    {
                        this.props.card.content
                    }
                    <button type="button" style={{float: "right"}} onClick={this.onClickDelete}  className="btn">X</button>
                </div>
            </div>
        );
    }
}