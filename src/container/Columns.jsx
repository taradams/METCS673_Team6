import React from 'react';
import Column from '../component/Column.jsx';
import './Board.css';

export default class Board extends React.Component {
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
        <div className="Board">
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