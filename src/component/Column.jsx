import React from 'react';
import Card from './Card';
import './Column.css';
import TextareaAutosize from 'react-autosize-textarea';

export default class Column extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addingCard: false,
            value: "",
            cards: this.props.cards ? this.props.cards : []
        };

        this.onAddCardClick = this.onAddCardClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAddButtonConfirmation = this.onAddButtonConfirmation.bind(this);
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    //todo componentWillMount load cards from db
    onAddCardClick() {
        this.setState({addingCard: true});
    }

    onAddButtonConfirmation() {
        this.state.cards.push({content: this.state.value});
        this.setState({addingCard: false, value: null, cards: this.state.cards});
    }

    render() {
        const textAreaStyle = {
            resize: "none",
            width: "100%",
            boxSizing: "border-box",
            borderRadius: 2,
            border: "none"
        }
        return (
            <div id="columncard" className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <div className="card-text">
                        {
                            this.state.cards.map((card) => {
                                return (<Card card={card}/>);
                            })
                        }
                    </div>
                    {
                        this.state.addingCard ? (
                            <div className="AddFooter">
                                <TextareaAutosize onChange={this.onChange} value={this.state.value} rows={3} style={textAreaStyle}/>
                                <button type="button" onClick={this.onAddButtonConfirmation} className="btn btn-success">Add</button>
                            </div>)
                            : 
                            (<button onClick={this.onAddCardClick} id="Add" className="btn">Add card</button>)
                    }
                </div>   
            </div>
        )
    }
}