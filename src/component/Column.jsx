import React from 'react';
import Card from './Card';
import './Column.css';

export default class Column extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addingCard: false,
        };

        this.onAddCardClick = this.onAddCardClick.bind(this);
    }

    //todo componentWillMount load cards from db
    onAddCardClick() {
        this.setState({addingCard: true});
    }

    render() {
        var cards = this.props.cards ? this.props.cards : [];
        console.log(this.state.addingCard);
        return (
            <div id="columncard" className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <div className="card-text">
                        {
                            cards.map((card) => {
                                return <Card card={card}/>
                            })
                        }
                    </div>
                    {
                        this.state.addingCard ? (
                            <Card addCard={true}/>
                            ) 
                            : 
                            (<button onClick={this.onAddCardClick} id="Add" className="btn">Add card</button>)
                    }
                </div>   
            </div>
        )
    }
}