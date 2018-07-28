import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Columns from './container/Columns';
import Page from './container/Page';

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/api/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          user: response.data.user
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          user: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Page />
     </div>
   );
  }
}

export default App;
