import React from 'react';
import Columns from './Columns';
import Column from '../component/Column';

class ProjectManagerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: []
    }
    this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
    this.handleAddList = this.handleAddList.bind(this);
  }
  
  //REST API
  componentDidMount() {
    fetch("http://localhost:5000/api/columns", {
      method: 'GET',
      mode: 'cors',
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        this.setState({ 
            columns: json.map((column) => { 
                return { title: column.name, id: column._id }
            })
        });
    }.bind(this));
  }

  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };

  handleAddList(value) {
      var columnToAdd = { name: value };
        fetch("http://localhost:5000/api/columns", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(columnToAdd),
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            this.state.columns.push({ title: json.name, id: json._id });
            this.setState({ columns: this.state.columns });
        }.bind(this));
  }

  handleDeleteColumn(id) {
    fetch("http://localhost:5000/api/columns/" + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
      .then(function(response) {
          return response.json();
      })
      .then(function(json) {
          this.setState({ columns: this.state.columns.filter((column) => column.id !== id) });                
      }.bind(this));
  }

  render() {
    return (
    <div>
      <h1>Project Manager Board</h1> 
          <div className="row"> 
            <Columns columns={this.state.columns} handleDeleteColumn={this.handleDeleteColumn} handleAddList={this.handleAddList}/> 
          </div>
      <h1>Issue Manager Board</h1>
        <div className="row">
            <div className="container">
            <div className="Columns">
                <div className="Column">
                    <Column title="Issues" id=""/>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
  }
}

export default ProjectManagerPage;
