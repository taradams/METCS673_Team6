import React from 'react';
import Column from '../component/Column.jsx';
import './Columns.css';

export default class Columns extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="Columns">
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