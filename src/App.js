import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Columns from './container/Columns';


class App extends Component {
  render() {
    return (
    <div className="App">
      <h1>Project Elmo</h1>
      
      <div className="Row">
        <Columns/>
      </div>
     
    </div>
    );
  }
}

export default App;
