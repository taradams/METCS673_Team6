import React from 'react';
import Card from './Card';
import './Column.css';
import TextareaAutosize from 'react-autosize-textarea';
import {
	DropTarget
} from 'react-dnd';
import Types from "../constants/types";

const cardTarget = {
    drop(props, monitor, component) {
        if (monitor.didDrop()) {
            return;
        }
        const item = monitor.getItem();
        component.handleDrop({content: item.card.content, id: item.card.id});
        return { text: item.text };
    },
    canDrop(props, monitor) {
        // You can disallow drop based on props or item
        const item = monitor.getItem();
        return true;
    },
}

function collect(connect, monitor) {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    };
  }

class Column extends React.Component {
    constructor(props) { 
        super(props);

        this.state = {
            id: this.props.id,
            title: this.props.title,
            addingCard: false,
            editTitle: false,
            value: "",
            cards: this.props.cards ? this.props.cards : []
        };

        this.onAddCardClick = this.onAddCardClick.bind(this);
        this.onChangeTaskToAdd = this.onChangeTaskToAdd.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onAddButtonConfirmation = this.onAddButtonConfirmation.bind(this);
        this.onCancelButtonConfirmation = this.onCancelButtonConfirmation.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTitleMode = this.editTitleMode.bind(this);
        this.handleOnEditClick = this.handleOnEditClick.bind(this);
        this.onClickDeleteColumn = this.onClickDeleteColumn.bind(this);
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
        if (this.state.title !== "")
            this.setState({editTitle: false});
    }

    //todo componentWillMount load cards from db
    onAddCardClick() {
        this.setState({addingCard: true});
    }

    onAddButtonConfirmation() {
        this.state.cards.push({content: this.state.value, id: this.generateUUID()});
        this.setState({addingCard: false, value: "", cards: this.state.cards});
    }

    handleDrop(card) {
        this.state.cards.push(card);
        this.setState({addingCard: false, value: "", cards: this.state.cards});
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

    onClickDeleteColumn() {
        if (this.props.handleDeleteColumn) {
            this.props.handleDeleteColumn(this.state.id);
        }
    }

    render() {
        const textAreaStyle = {
            resize: "none",
            width: "100%",
            boxSizing: "border-box",
            borderRadius: 2,
            border: "none"
        }

        const { isOver, canDrop, connectDropTarget } = this.props;
        return (connectDropTarget && connectDropTarget(
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
                            <button type="button" onClick={this.onClickDeleteColumn} style={{float: "right"}} className="btn">X</button>
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
        ))
    }
}

export default DropTarget(Types.CARD, cardTarget, collect)(Column);