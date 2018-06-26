import React from 'react';
import Column from '../component/Column.jsx';
import './Columns.css';
import TextareaAutosize from 'react-autosize-textarea';

export default class Columns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: "Backlog"   
            }, {
                title: "In development"
            }, {
                title: "Done"
            }],
            addListValue: ""
        }
        this.handleInputAddColumnField = this.handleInputAddColumnField.bind(this);
        this.handleAddListClick = this.handleAddListClick.bind(this);
    }

    handleInputAddColumnField(e) {
        this.setState({addListValue: e.target.value});
    }

    handleAddListClick() {
        this.state.columns.push({ title: this.state.addListValue });
        this.setState({ addListValue: "", columns: this.state.columns });
    }

    

    render() {
        return (
        <div className="Columns">
            {
                this.state.columns.map((column) => {
                    return  (<div className="container">
                        <Column title={column.title} />
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
