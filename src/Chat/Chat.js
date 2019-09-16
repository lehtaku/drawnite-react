import React, { Component } from 'react';

import './Chat.css'

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: props.socket
                .on('player-connected', player => this.playerConnected(player))
                .on('player-disconnected', player => this.playerDisconnected(player))
                .on('chat-message', msg => this.appendMsgToChat(msg)),
            chatInput: '',
            messages: []
        };
        this.chatBox = React.createRef();

        this.appendMsgToChat = this.appendMsgToChat.bind(this);
        this.handleMsgInput = this.handleMsgInput.bind(this);
        this.sendNewMsg = this.sendNewMsg.bind(this);

        this.playerConnected = this.playerConnected.bind(this);
        this.playerDisconnected = this.playerDisconnected.bind(this);
    }

    playerConnected(player) {
        this.appendMsgToChat({
            sender: 'Server',
            text: player.name + ' joined to lobby.'
        })
    }

    playerDisconnected(player) {
        this.appendMsgToChat({
            sender: 'Server',
            text: player.name + ' leaved lobby.'
        })
    }

    appendMsgToChat(msg) {
        const messages = [...this.state.messages];
        messages.push({
            sender: msg.sender,
            text: msg.text
        });
        this.setState({ messages: messages });
        this.chatBox.current.scrollTop = this.chatBox.current.scrollHeight - this.chatBox.current.clientHeight;
    }

    handleMsgInput(event) {
        this.setState({ chatInput: event.target.value });
    }

    sendNewMsg(event) {
        event.preventDefault();
        if (this.state.chatInput.length > 0) {
            this.state.socket.emit('chat-message', this.state.chatInput);
            this.setState({ chatInput: '' })
        }
    }

    render() {
        const messages = this.state.messages.map((msg, key) =>
            <li key={ key } className="list-group-item chat-message">
                <strong>{msg.sender}: </strong>{ msg.text }
            </li>
        );

        const inputForm =
            <li className="list-group-item">
                <form onSubmit={ this.sendNewMsg }>
                    <div className="input-group mb-3 chat-input">
                        <input type="text"
                               onChange={ this.handleMsgInput }
                               value={ this.state.chatInput }
                               className="form-control"
                               placeholder="Type here"
                               aria-label="Type here"
                               aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit">Send</button>
                        </div>
                    </div>
                </form>
            </li>;

        return (
            <ul className="list-group">
                <li className="list-group-item list-title active">Chat</li>
                <div ref={ this.chatBox } className="messages">
                    { messages }
                </div>
                {inputForm}
            </ul>
        )
    }
}

export default Chat;
