import React from 'react';

import './ListButton.css';

const ListButton = (props) => {
    return (
        <li className="list-group-item">
            <button onClick={ props.handler } type="button" className="btn btn-outline-primary start-button">Start Game</button>
        </li>
    )
};

export default ListButton;
