import React, {Component} from 'react';
import './IssueForm.css';

class IssueForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            titleInput: "",
            descriptionInput: ""
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.createNewIssueBtn = this.createNewIssueBtn.bind(this);
    }

    handleTitleChange(e){
        this.setState({
            titleInput: e.target.value
        });
    }

    handleDescriptionChange(e){
        this.setState({
            descriptionInput: e.target.value
        });
    }

    createNewIssueBtn(){
        if (this.props.createNewIssue)
            this.props.createNewIssue(this.state.titleInput, this.state.descriptionInput);
        this.setState({
            titleInput: "",
            descriptionInput: ""
        });
    }

    render(){
        return(
            <form>
                <div>
                    <textarea 
                    className="issue-title" 
                    placeholder="Issue Title" 
                    value={this.state.titleInput} 
                    onChange={this.handleTitleChange}/>
                </div>
                <div>
                    <textarea 
                    className="issue-description" 
                    placeholder="Write a description..." 
                    value={this.state.descriptionInput} 
                    onChange={this.handleDescriptionChange}/>
                </div>
                <button type="button" onClick={this.createNewIssueBtn}>Create New Issue</button>
            </form>
        );
    }

}

export default IssueForm;