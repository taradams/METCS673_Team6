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
            columns: this.props.columns ? this.props.columns : []
        }
        this.handleAddList = this.handleAddList.bind(this);
        this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
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
        if (value !== "" && this.props.handleAddList) {
            this.props.handleAddList(value);
        }
    }

    handleDeleteColumn(id) {
        if (this.props.handleDeleteColumn)
            this.props.handleDeleteColumn(id);
    }

    render() {
        return (
            <div className="Columns">
            {
                this.props.columns.map((column) => {
                    return  (
                    <div className="container" key={this.generateUUID()}>
                        <Column title={column.title} id={column.id} key={column.id} handleDeleteColumn={this.handleDeleteColumn}/>
                    </div>);
                })
            }
            <AddColumn handleAddList={this.handleAddList}/>
            </div>
        );
    }
}
