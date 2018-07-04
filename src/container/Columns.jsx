import React from 'react';
import Column from '../component/Column.jsx';
import './Columns.css';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AddColumn from '../component/AddColumn';

export default class Columns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: []
        }
        this.handleAddList = this.handleAddList.bind(this);
        this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
    }

    //REST API
    componentDidMount() {
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
                    })                });
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



    handleAddList(value) {
        if (value !== "") {
            var columnToAdd = { name: value };
            fetch("http://localhost:5000/api/columns", {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(columnToAdd),
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                this.state.columns.push({ title: json.name, id: json._id });
                this.setState({ columns: this.state.columns });
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
                this.setState({ columns: this.state.columns.filter((column) => column.id !== id) });                
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
            <AddColumn handleAddList={this.handleAddList}/>
            </div>
        );
    }
}