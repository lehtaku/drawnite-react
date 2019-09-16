import React, { Component } from 'react';

class JoiningLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkUrl: 'localhost:3000/' + props.lobbyId
        };
        this.linkEl = React.createRef();
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    copyToClipboard() {
        this.linkEl.current.select();
        document.execCommand('copy');
    }

    render() {
        return (
            <div id="chat-input" className="input-group mb-3">
                <input type="text"
                       ref={ this.linkEl }
                       readOnly
                       value={ this.state.linkUrl }
                       className="form-control"
                       placeholder="Share this link with friends"
                       aria-label="Share this link with friends"
                       aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button onClick={ this.copyToClipboard } className="btn btn-outline-secondary" type="button">Copy Link</button>
                </div>
            </div>
        )
    }
}

export default JoiningLink;
