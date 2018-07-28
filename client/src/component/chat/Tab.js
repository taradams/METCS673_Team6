import React from 'react';
import ReactDOM from 'react-dom';
import Room from './Room';

export default class Tab extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: true }
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if (this.state.show) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    }

    render() {
        return (
            <div className="TabDiv">
                <input type="submit" value="Chat" onClick={this.onClick} />
                <div className="room">
                    {/*{this.state.show ?*/} <Room /> {/*: null}*/}
                </div>
            </div>
        )
    }
}