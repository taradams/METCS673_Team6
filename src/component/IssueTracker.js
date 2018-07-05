import React,{Component} from 'react';
import IssueCard from './IssueCard';
import IssueForm from './IssueForm';

class IssueTrackerPage extends Component{
    constructor(props){
        super(props);
    
        this.state = {
          issueTitleList: [],
          issueDescList: [],
          issues: [
            // {id: 1, title: "title1", description: "desc1"},
            // {id: 2, title: "title2", description: "desc2"}
          ]
        };
        // this.createNewIssue = this.createNewIssue.bind(this);
        this.handleCreateNewIssue = this.handleCreateNewIssue.bind(this);

    }

    // componentDidMount() {
    //     fetch("http://localhost:5000/api/tasks", {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //             'Access-Control-Allow-Origin': '*'
    //         }
    //     })
    //         .then(function(response) {
    //             return response.json();
    //         })
    //         .then(function(json) {
    //             this.setState({ 
    //                 issues: json.map((task) => { 
    //                 return {titleContent: task.overview, descriptionContent: task.details, id: task._id}
    //                 })
    //             });
    //         }.bind(this));
    // }

    // createNewIssue(title, description){
    //     const previousIssues = this.state.issues;
    //     previousIssues.push({
    //       id: previousIssues.length + 1,
    //       titleContent: title,
    //       descriptionContent: description
    //     });
    
    //     this.setState({
    //       issues: previousIssues
    //     });
    //   }

    handleCreateNewIssue(title, description){
            var issueToAdd = { overview: title, details: description };
            fetch("http://localhost:5000/api/tasks", {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(issueToAdd),
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                this.state.issues.push({ titleContent: json.overview, descriptionContent: json.details, id: json._id });
                this.setState({ issues: this.state.issues });
            }.bind(this));
    }

      render() {
        return (
            <div>
                <IssueForm createNewIssue={this.handleCreateNewIssue}/>
                <div>
                {
                    this.state.issues.map((issue) => {
                    return(
                        <IssueCard title={issue.titleContent} 
                        description={issue.descriptionContent}
                        key={issue.id} />
                    )
                    })
                }
                </div>
            </div>
            );
    }
}


export default IssueTrackerPage;
