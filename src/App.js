import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Columns from './container/Columns';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row">
          <Columns/>
        </div>
      </div>
    );
  }
}

export default App;
