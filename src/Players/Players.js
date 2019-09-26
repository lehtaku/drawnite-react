import React from 'react';
import './Players.css';
import ListTitle from "../List/ListTitle/ListTitle";
import Player from "../List/Player/Player";

const Players = (props) => {
    const players = props.players.map((player, key) =>
        <Player key={ key }
                player={ player } />
    );

    return (
            <ul className="list-group players">
                <ListTitle title="Players" />
                { players }
            </ul>
    )
};

export default Players;
