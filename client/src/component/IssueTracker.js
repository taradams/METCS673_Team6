import React from 'react';
import IssueCard from './IssueCard';
import IssueForm from './IssueForm';
import withAuthorization from './withAuthorization';
import { getIssueCards, addNewIssue } from '../api/IssueTracker';
import { receiveUpdate, onUpdate } from '../api/socket';
class IssueTrackerPage extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
          issues: [
            // {id: 1, title: "title1", details: "desc1"},
            // {id: 2, title: "title2", details: "desc2"}
          ]
        };
        this.createNewIssue2 = this.createNewIssue2.bind(this);
        this.retrieveTask = this.retrieveTask.bind(this);
        
        receiveUpdate(() => this.retrieveTask());
    }

    retrieveTask(){
        getIssueCards(function(json){
            const issues = json.map((issue) => {
                return { id: issue._id, title: issue.overview, details: issue.details, user: issue.assignee };
            });
            this.setState({issues: issues});
        }.bind(this));
    }

    componentDidMount(){
        this.retrieveTask();
    }

    // componentDidMount() {
    //     fetch("/api/tasks", {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //             'Access-Control-Allow-Origin': '*'
    //         }
    //     })
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(json) {
    //         this.setState({
    //             issues: json.map((issue) => {
    //                 return { id: issue._id, title: issue.overview, details: issue.details, user: issue.assignee };
    //             })
    //         });
    //     }.bind(this));
    // }

    // createNewIssue(title, description){
    //     const task = { task_type: "Bug", overview: title, details: description };
    //     fetch("/api/tasks/", {
    //         method: 'POST',
    //         mode: 'cors',
    //         body: JSON.stringify(task),
    //         headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //             'Access-Control-Allow-Origin': '*'
    //         }
    //     })
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(json) {
    //         this.state.issues.push({
    //             id: json._id,
    //             title: json.overview,
    //             details: json.details
    //         });    
    //         this.setState({
    //             issues: this.state.issues
    //         });
    //     }.bind(this));
    // }

    createNewIssue2(title, description){
        const issue = { task_type: "Bug", overview: title, details: description };
        addNewIssue(issue, function(json){
            this.state.issues.push({
                id: json._id,
                title: json.overview,
                details: json.details
            });
            onUpdate();
            this.setState({
                issues: this.state.issues
            });
        }.bind(this));
    }

      render() {
        return (
            <div>
                <IssueForm createNewIssue={this.createNewIssue2}/>
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

const authCondition = (user) => !!user;

export default withAuthorization(authCondition)(IssueTrackerPage);
