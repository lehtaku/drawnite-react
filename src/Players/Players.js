import React, { Component } from 'react';

import './Players.css'

class Players extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: props.socket
                .on('players-changed', players => this.playersChanged(players)),
            players: []
        };

        this.playersChanged = this.playersChanged.bind(this);
        this.editUsername = this.editUsername.bind(this);
    }

    playersChanged(players) {
        this.setState({ players: players });
    }

    editUsername() {
        let newUsername = prompt('Set new username:');
        this.state.socket.emit('username-changed', newUsername);
    }

    render() {
        const players = this.state.players.map((player, key) =>
            <li className="list-group-item player-name" key={ key }>
                <div className="d-flex justify-content-between">
                    <img alt="Avatar" className="avatar" src="https://image.flaticon.com/icons/png/512/97/97895.png"/>
                    { player.name }
                    { player.id === this.state.socket.id ? (
                        <img onClick={ this.editUsername } alt="Edit name" className="edit" src="https://img.icons8.com/cotton/2x/edit--v1.png"/>
                    ) : (
                        <img alt="Edit name" className="edit-disabled" src={ process.env.PUBLIC_URL + '/img/edit-disabled.png' }/>
                    )}
                </div>
            </li>
        );

        return (
            <ul className="list-group players">
                <li className="list-group-item list-title active">Players</li>
                    { players }
            </ul>
        )
    }

}

export default Players;
