import React from 'react';
import Card from './Card';
import './Column.css';
import TextareaAutosize from 'react-autosize-textarea';

export default class Column extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columnTitle: "Add New Title",
            addingCard: false,
            value: "",
            cards: this.props.cards ? this.props.cards : []
            //cards: []
        };

        this.onAddCardClick = this.onAddCardClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAddButtonConfirmation = this.onAddButtonConfirmation.bind(this);
        this.onCancelButtonConfirmation = this.onCancelButtonConfirmation.bind(this);
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    //todo componentWillMount load cards from db
    onAddCardClick() {
        this.setState({addingCard: true});
    }

    onAddButtonConfirmation() {
        if (this.state.value !== "") {
            this.state.cards.push({content: this.state.value});
            this.setState({addingCard: false, value: "", cards: this.state.cards});
        }
    }

    onCancelButtonConfirmation(){
            this.setState({addingCard: false, value: "", cards: this.state.cards});
        
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
            <div className="column">
                <h4 className="column-title">{this.state.columnTitle}</h4>
                <div className="card-body">
                    {/* <h4 className="column-title">{this.state.columnTitle}</h4> */}
                    <div className="card-text">
                        {
                            this.state.cards.map((card) => {
                                return (<Card card={card}/>);
                            })
                        }
                    </div>
                    {
                        // this.state.addingCard ? (
                        //     <div className="AddFooter">
                        //         <TextareaAutosize onChange={this.onChange} value={this.state.value} rows={3} style={textAreaStyle}/>
                        //         <button type="button" onClick={this.onAddButtonConfirmation} className="btn btn-success">Add</button>
                        //     </div>)
                        //     : (<button onClick={this.onAddCardClick} className="Add-btn">Add card</button>)
                    }
                    {
                        this.state.addingCard ? (
                            <div className="AddFooter">
                                <TextareaAutosize onChange={this.onChange} value={this.state.value} rows={3} style={textAreaStyle}/>
                                <button type="button" onClick={this.onAddButtonConfirmation} className="btn btn-success">Add</button>
                                <button type="button" onClick={this.onCancelButtonConfirmation} className="cancelBtn">X</button>
                            </div>)
                            : (<button onClick={this.onAddCardClick} className="Add-btn">Add card</button>)
                    }
                </div>   
            </div>
        )
    }
}