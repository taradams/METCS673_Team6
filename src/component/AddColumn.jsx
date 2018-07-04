import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

export default class AddColumn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addListValue: ""
        };
        this.handleInputAddColumnField = this.handleInputAddColumnField.bind(this);
        this.handleAddListClick = this.handleAddListClick.bind(this);
    }

    handleInputAddColumnField(e) {
        this.setState({addListValue: e.target.value});
    }

    handleAddListClick() {
        if (this.props.handleAddList) {
            this.props.handleAddList(this.state.addListValue);
            this.setState({ addListValue: "" });
        }
    }

    render() {
        return (
            <div className="container">
                    <TextareaAutosize value={this.state.addListValue} onChange={this.handleInputAddColumnField} placeholder="Add a list" />
                    <br/>
                    <button id="Add" onClick={this.handleAddListClick} className="btn">Add</button>
            </div>
        );
    }
}