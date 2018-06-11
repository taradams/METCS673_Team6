import React from 'react';
import Column from '../component/Column.jsx';
import './Columns.css';

export default class Columns extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <span id="Columns">
            <span className="container">
                    <Column title="Backlog" />
            </span>
            <span className="container">
                    <Column title="In development"/>
            </span>
            <span className="container">
                    <Column title="Done" />
            </span>
        </span>
        );
    }
}