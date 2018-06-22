import React from 'react';
import Column from '../component/Column.jsx';
import './Columns.css';

export default class Columns extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: []
        };
    }

    addNewColumn(){
        console.log("Column added!");
    }

    

    render() {
        return (
        <div className="Columns">
            <div className="container">
                    <Column />
            </div>
            <div className="container">
                    <Column title="Backlog" />
            </div>
            <div className="container">
                    <Column title="In development"/>
            </div>
            <div className="container">
                    <Column title="Done" />
            </div>
        </div>
        );
    }
}
