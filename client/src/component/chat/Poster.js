import React from 'react';
import ReactDOM from 'react-dom';
import './Poster.css';

export default class Poster extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(e) {
        e.preventDefault();
        if (this.state.value !== "")
            this.props.handlerFromParent(this.state.value);
        this.setState(
            { value: '' }
        );
    }

    handleChange(e) {
        this.setState(
            { value: e.target.value }
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div className="poster_text_border">
                        <input
                            className="poster_text"
                            type="text"
                            id="theInput"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button
                        className="poster_button"
                        type="submit"
                    ><i class="fas fa-arrow-up"></i>

</button>
                </form>
            </div >
        );
    }
}
