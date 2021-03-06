import React from 'react';
import Card from './Card';
import './Column.css';
import TextareaAutosize from 'react-autosize-textarea';
import {
	DropTarget
} from 'react-dnd';
import Types from "../constants/types";
import { receiveUpdate, onUpdate } from '../api/socket';
import { getTaskByColumnID, getTaskWithoutColumnID, addCard, deleteCard, editCard } from '../api/cards';
import { editColumnTitle } from '../api/columns';
import update from 'react-addons-update';

const cardTarget = {
    drop(props, monitor, component) {
        const hasDroppedOnChild = monitor.didDrop();
        const item = monitor.getItem();          
        if (hasDroppedOnChild) {
            return;
        }
        item.localDeleteHandler(item.card.id);            
        component.handleDrop(item.card);
        monitor.isOver
        return { text: item.text };          
        
    },

    canDrop(props, monitor) {
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
        this.localDeleteTask = this.localDeleteTask.bind(this);
        this.editTitleMode = this.editTitleMode.bind(this);
        this.handleOnEditClick = this.handleOnEditClick.bind(this);
        this.onClickDeleteColumn = this.onClickDeleteColumn.bind(this);
        this.hasCard = this.hasCard.bind(this);
        this.moveCard = this.moveCard.bind(this)
        this.retrieveTask = this.retrieveTask.bind(this);
        this.handleEditCard = this.handleEditCard.bind(this);
        
        receiveUpdate(() => this.retrieveTask());
    }

    retrieveTask() {
        if (this.state.id != "")
            getTaskByColumnID(this.state.id, function(json) {
                const cards = json.map((task) => {
                    return { id: task._id, content: task.overview, status: task.status, details: task.details, user: task.assignee };
                });
                this.setState({ addingCard: false, value: "", cards: cards });
            }.bind(this));
        else
            getTaskWithoutColumnID(function(json) {
                    const cards = json.map((task) => {
                        return { id: task._id, content: task.overview, status: task.status, details: task.details, user: task.assignee };
                    });
                    this.setState({ addingCard: false, value: "", cards: cards });
                }.bind(this));
    }

    componentDidMount() {
        this.retrieveTask();
    }
    
    onChangeTaskToAdd(e) {
        this.setState({value: e.target.value});
    }

    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    handleOnEditClick() {
        if (this.state.title !== "") {
            const editColumn = {name: this.state.title};
            editColumnTitle(this.state.id, editColumn, function(json) {
                onUpdate();
                this.setState({editTitle: false});                
            }.bind(this));
        }
    }

    //todo componentWillMount load cards from db
    onAddCardClick() {
        this.setState({addingCard: true});
    }

    onAddButtonConfirmation() {
        if (this.state.value !== "") {
            const card = { task_type: "Normal", status: this.state.id, overview: this.state.value, details: "" };

            addCard(card, function(json) {
                this.state.cards.push({content: json.overview, id: json._id, status: this.state.id, details: json.details, taskType: json.task_type});
                onUpdate(); //emit event to Socket.io
                this.setState({addingCard: false, value: "", cards: this.state.cards});
            }.bind(this));

        }
    }

    hasCard(card) {
        return this.state.cards.some(cardInColumn => cardInColumn.id === card.id);
    }

    handleDrop(card) {
        if (this.state.id != "") {
            const editStatus = { status: this.state.id };
            card.status = editStatus.status;
            editCard(card.id, editStatus, function(json) {
                    this.state.cards.push(card);
                    onUpdate();
                    this.setState({addingCard: false, value: "", cards: this.state.cards});
                }.bind(this));
        }
    }
    

    onCancelButtonConfirmation(){
        this.setState({addingCard: false, value: "", cards: this.state.cards});
    }

    deleteTask(id) {
        deleteCard(id, function(json) {
            onUpdate();
            this.localDeleteTask(id);
        }.bind(this));
    }

    localDeleteTask(id) {
        this.setState({ cards: this.state.cards.filter((card) => card.id !== id)});
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

    moveCard(dragIndex, hoverIndex) {
        const dragCard = this.state.cards[dragIndex];
        
		this.setState(
			update(this.state, {
				cards: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
        );
    }

    handleEditCard(id, title, description, user) {
        var index = this.state.cards.findIndex(x => x.id === id);

        this.state.cards[index].content = title;
        this.state.cards[index].details = description;
        this.state.cards[index].user = user;
        this.setState({ cards: this.state.cards });
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
                            {this.state.id !== "" ? <button type="button" onClick={this.editTitleMode}  className="title_btn" style={{cursor:"text"}}>{this.state.title}</button> : null}
                            {this.state.id !== "" ? <button type="button" onClick={this.onClickDeleteColumn} style={{float: "right", cursor:"pointer"}} className="btn">X</button> : null}
                        </h5>)
                    }
                    <div className="card-text">
                        {
                            this.state.cards.map((card, index) => {
                                return (<Card card={card} index={index} localDeleteHandler={this.localDeleteTask} deleteHandler={this.deleteTask} key={card.id} handleEditCardInColumn={this.handleEditCard} moveCard={this.moveCard}/>);
                            })
                        }
                    </div>
                    { this.state.id === "" ? null :
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
