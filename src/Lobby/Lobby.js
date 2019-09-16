import React, { Component } from 'react';
import SocketIO from 'socket.io-client';
import './Lobby.css'

import PageTitle from "../PageTitle/PageTitle";
import Players from "../Players/Players";
import Chat from "../Chat/Chat";
import Settings from "../Settings/Settings";
import JoiningLink from "../JoiningLink/JoiningLink";

class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lobbyId: props.match.params.lobbyId,
            socket: SocketIO.connect('http://localhost:9000?token=' + props.match.params.lobbyId)
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm page-title">
                        <PageTitle/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <Players socket={ this.state.socket }/>
                        <Settings socket={ this.state.socket }/>
                    </div>
                    <div className="col-sm">
                        <Chat socket={ this.state.socket }/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <JoiningLink lobbyId={this.state.lobbyId}/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Lobby;
