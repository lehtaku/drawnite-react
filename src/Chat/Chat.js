import React from 'react';

import ListTitle from "../List/ListTitle/ListTitle";

import './Chat.css'
import RoundDetails from "../RoundDetails/RoundDetails";

const Chat = (props) => {
    const messages = props.messages.map((msg, key) =>
        <li key={ key } className="list-group-item chat-message">
            <strong>{msg.sender}: </strong>{ msg.text }
        </li>
    );

    const inputForm =
        <li className="list-group-item">
            <form onSubmit={ props.newMsg }>
                <div className="input-group mb-3 chat-input">
                    <input type="text"
                           onChange={ props.onInput }
                           value={ props.inputValue }
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
            <ListTitle title="Chat" />
            <div ref={ props.chatRef } className="messages">
                { messages }
            </div>
            { inputForm }
        </ul>
    )
};

export default Chat;
