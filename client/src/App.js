import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Columns from './container/Columns';
import Page from './container/Page';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Page />
     </div>
   );
  }
}

export default App;
