import React from 'react';
import Column from '../component/Column.jsx';
import './Columns.css';
import TextareaAutosize from 'react-autosize-textarea';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default class Columns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: "Backlog",
                id: this.generateUUID()
            }, {
                title: "In development",
                id: this.generateUUID()
            }, {
                title: "Done",
                id: this.generateUUID()
            }],
            addListValue: ""
        }
        this.handleInputAddColumnField = this.handleInputAddColumnField.bind(this);
        this.handleAddListClick = this.handleAddListClick.bind(this);
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

    handleInputAddColumnField(e) {
        this.setState({addListValue: e.target.value});
    }

    handleAddListClick() {
        this.state.columns.push({ title: this.state.addListValue, id: this.generateUUID() });
        this.setState({ addListValue: "", columns: this.state.columns });
    }

    render() {
        return (
            <div className="Columns">
            {
                this.state.columns.map((column) => {
                    return  (<div className="container">
                        <Column title={column.title} id={column.id} key={column.id}/>
                    </div>)
                })
            }
            <div className="container">
                <TextareaAutosize value={this.state.addListValue} onChange={this.handleInputAddColumnField} placeholder="Add a list" />
                <br/>
                <button id="Add" onClick={this.handleAddListClick} className="btn">Add</button>
            </div>
            </div>
        );
    }
}