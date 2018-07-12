import React from 'react';
import IssueCard from './IssueCard';
import IssueForm from './IssueForm';

class IssueTrackerPage extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
          issues: [
            // {id: 1, title: "title1", details: "desc1"},
            // {id: 2, title: "title2", details: "desc2"}
          ]
        };
        this.createNewIssue = this.createNewIssue.bind(this);
    }

    componentDidMount() {
        fetch("https://salty-tundra-35534.herokuapp.com/api/tasks", {
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
                issues: json.map((issue) => {
                    return { id: issue._id, title: issue.overview, details: issue.details };
                })
            });
        }.bind(this));
    }

    createNewIssue(title, description){
        const task = { task_type: "Bug", overview: title, details: description };
        fetch("https://salty-tundra-35534.herokuapp.com/api/tasks", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            this.state.issues.push({
                id: json._id,
                title: json.overview,
                details: json.details
            });    
            this.setState({
                issues: this.state.issues
            });
        }.bind(this));
    }

      render() {
        return (
            <div>
                <IssueForm createNewIssue={this.createNewIssue}/>
                <div>
                {
                    this.state.issues.map((issue) => {
                        return(
                            <IssueCard issue={issue} key={issue.id} />
                        );
                    })
                }
                </div>
            </div>
            );
    }
}


export default IssueTrackerPage;
