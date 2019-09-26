import React from 'react';

import './Player.css'

const Player = (props) => {
    return (
        <li className="list-group-item player-name">
            <div className="d-flex justify-content-between">
                <img alt="Avatar" className="avatar" src="https://image.flaticon.com/icons/png/512/97/97895.png"/>
                { props.player.name }
                <span>Score: { props.player.score }</span>
            </div>
        </li>
    )
};

export default Player;
