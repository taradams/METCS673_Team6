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
            columns: [],
            addListValue: ""
        }
        this.handleInputAddColumnField = this.handleInputAddColumnField.bind(this);
        this.handleAddListClick = this.handleAddListClick.bind(this);
        this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
    }

    //REST API
    componentWillMount() {
        fetch("http://localhost:5000/api/columns", {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                this.setState({ 
                    columns: json.map((column) => { 
                        return { title: column.name, id: column._id }
                    }),
                    addListValue: ""
                });
            }.bind(this));
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
        if (this.state.addListValue !== "") {
            columnToAdd = { name: this.state.addListValue };
            fetch("http://localhost:5000/api/columns", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                this.state.columns.push({ title: this.state.addListValue, id: this.generateUUID() });
                this.setState({ addListValue: "", columns: this.state.columns });
                this.setState({ addListValue: "", columns: this.state.columns.filter((column) => column.id !== id) });                
            }.bind(this));

        }
    }

    handleDeleteColumn(id) {
        fetch("http://localhost:5000/api/columns/" + id, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                this.setState({ addListValue: "", columns: this.state.columns.filter((column) => column.id !== id) });                
            }.bind(this));
        }

    render() {
        return (
            <div className="Columns">
            {
                this.state.columns.map((column) => {
                    return  (<div className="container" key={this.generateUUID()}>
                        <Column title={column.title} id={column.id} key={column.id} handleDeleteColumn={this.handleDeleteColumn}/>
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