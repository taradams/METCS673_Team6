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
        this.createNewIssue = this.createNewIssue.bind(this);
    }

    createNewIssue(title, description){
        const previousIssues = this.state.issues;
        previousIssues.push({
          id: previousIssues.length + 1,
          titleContent: title,
          descriptionContent: description
        });
    
        this.setState({
          issues: previousIssues
        });
      }

      render() {
        return (
            <div>
                <IssueForm createNewIssue={this.createNewIssue}/>
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
