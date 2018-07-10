import React from 'react';
import './IssueCard.css';
import TextareaAutosize from 'react-autosize-textarea';


class IssueCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            issueCardTitle: this.props.issue.title,
            editTitle: false,
        };

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.handleOnEditClick = this.handleOnEditClick.bind(this);
        this.editTitleMode = this.editTitleMode.bind(this);
    }

    onChangeTitle(e) {
        this.setState({issueCardTitle: e.target.value});
    }

    handleOnEditClick() {
            const editIssueTitle = {overview: this.state.title};
            fetch("http://localhost:5000/api/tasks/" + this.state.id, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(editIssueTitle),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                this.setState({editTitle: false});                
            }.bind(this));
    }

    editTitleMode() {
        this.setState({
            issueCardTitle: this.state.issueCardTitle,
            editTitle: true,
        });
    }

    render() {
        const textAreaStyle = {
            resize: "none",
            width: "100%",
            boxSizing: "border-box",
            borderRadius: 2,
            border: "none"
        }

        return(
        <div className="IssueCard">
            {/* <h5>{this.props.issue.title}{<button type="button">Edit</button>}</h5> */}
            {/* <h5>{this.state.issueCardTitle}{<button type="button">Edit</button>}</h5> */}
            {
                this.state.editTitle ?
                (<div>
                    <TextareaAutosize onChange={this.onChangeTitle} value={this.state.issueCardTitle} rows={1} style={textAreaStyle}/>
                    <button type="button" onClick={this.handleOnEditClick}>Confirm</button>
                </div>
                ) :
                (<h5>
                    {this.state.issueCardTitle}
                    {<button type="button" onClick={this.editTitleMode}>Edit</button>}
                </h5>)
            }
            <div className="horizontal-line" />
            <p>{this.props.issue.details} {<button type="button">Edit</button>}</p>
        </div>
    )
    }
}

export default IssueCard;