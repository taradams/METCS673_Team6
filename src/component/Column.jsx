import React from 'react';
import Card from './Card';
import './Column.css';
import TextareaAutosize from 'react-autosize-textarea';

export default class Column extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            addingCard: false,
            editTitle: false,
            value: "",
            cards: this.props.cards ? this.props.cards : []
            //cards: []
        };

        this.onAddCardClick = this.onAddCardClick.bind(this);
        this.onChangeTaskToAdd = this.onChangeTaskToAdd.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onAddButtonConfirmation = this.onAddButtonConfirmation.bind(this);
        this.onCancelButtonConfirmation = this.onCancelButtonConfirmation.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTitleMode = this.editTitleMode.bind(this);
        this.handleOnEditClick = this.handleOnEditClick.bind(this);
    }

    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
    


    onChangeTaskToAdd(e) {
        this.setState({value: e.target.value});
    }

    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    handleOnEditClick() {
        this.setState({editTitle: false});
    }

    //todo componentWillMount load cards from db
    onAddCardClick() {
        this.setState({addingCard: true});
    }

    onAddButtonConfirmation() {
        if (this.state.value !== "") {
            this.state.cards.push({content: this.state.value, id: this.generateUUID()});
            this.setState({addingCard: false, value: "", cards: this.state.cards});
        }
    }

    onCancelButtonConfirmation(){
            this.setState({addingCard: false, value: "", cards: this.state.cards});
        
    }

    deleteTask(id) {
        this.setState({
            title: this.state.title,
            addingCard: this.state.addingCard, 
            value: this.state.value,
            editTitle: this.state.editTitle,
            cards: this.state.cards.filter((card) => card.id !== id)
        });
    }

    editTitleMode() {
        this.setState({
            title: this.state.title,
            addingCard: this.state.addingCard, 
            value: this.state.value,
            editTitle: true,
            cards: this.state.cards
        });
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
                    {
                    this.state.editTitle ? 
                        (<div>
                            <TextareaAutosize onChange={this.onChangeTitle} value={this.state.title} rows={1} style={textAreaStyle}/>
                            <button type="button" onClick={this.handleOnEditClick} className="btn btn-success">Confirm</button>
                        </div>
                        )
                    :
                        (<h5 className="card-title">
                            {this.state.title}
                            <button type="button" onClick={this.editTitleMode}  className="btn">Edit</button>
                        </h5>)
                    }
                    <div className="card-text">
                        {
                            this.state.cards.map((card) => {
                                return (<Card card={card} deleteHandler={this.deleteTask} key={card.id}/>);
                            })
                        }
                    </div>
                    {
                        this.state.addingCard ? (
                            <div className="AddFooter">
                                <TextareaAutosize onChange={this.onChangeTaskToAdd} value={this.state.value} rows={3} style={textAreaStyle}/>
                                <br/>
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