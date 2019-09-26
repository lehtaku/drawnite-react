import React, { Component } from 'react';
import SocketIO from 'socket.io-client';
import './Lobby.css'

import PageTitle from "../PageTitle/PageTitle";
import Players from "../Players/Players";
import Chat from "../Chat/Chat";
import Settings from "../Settings/Settings";
import JoiningLink from "../JoiningLink/JoiningLink";
import Axios from "axios";
import Canvas from "../Canvas/Canvas";
import Toolbar from "../Toolbar/Toolbar";
import RoundDetails from "../RoundDetails/RoundDetails";

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: props.match.params.gameId,
            gameOn: false,
            settings: {},
            players: [],
            chat: {
                input: '',
                messages: []
            },
            messages: [],
            socket: SocketIO.connect('http://localhost:9000?token=' + props.match.params.gameId)
                .on('ask-name', (question, answer) => answer(prompt(question)))
                .on('players-changed', players => this.playersChanged(players))
                .on('new-settings', settings => this.receiveSettings(settings))
                .on('state-changed', newState => this.gameStateChanged(newState))

                .on('player-connected', name => this.playerConnected(name))
                .on('player-disconnected', name => this.playerDisconnected(name))
                .on('chat-message', msg => this.receiveMsg(msg)),
        };

        this.chatBox = React.createRef();

        this.playersChanged = this.playersChanged.bind(this);
        this.emitSettings = this.emitSettings.bind(this);
        this.receiveSettings = this.receiveSettings.bind(this);
        this.changeGameState = this.changeGameState.bind(this);
        this.gameStateChanged = this.gameStateChanged.bind(this);
        this.onChatInput = this.onChatInput.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.receiveMsg = this.receiveMsg.bind(this);
    }

    async componentDidMount() {
        const game = await Axios.get('http://localhost:9000/api/v1/game/' + this.state.gameId);
        this.setState({
            gameOn: game.data.gameOn,
            settings: game.data.settings
        });
    }

    playersChanged(players) {
        this.setState({ players: players });
    }

    gameStateChanged(newState) {
        this.setState({ gameOn: newState })
    }

    emitSettings(settings) {
        this.state.socket.emit('settings-changed', settings);
    }

    receiveSettings(settings) {
        this.setState({ settings: settings })
    }

    changeGameState() {
        this.state.socket.emit('change-state', this.state.gameOn);
    }

    onChatInput(ev) {
        this.setState({ chat: { input: ev.target.value } });
    }

    sendMsg(ev) {
        ev.preventDefault();
        if (this.state.chat.input.length > 0) {
            this.state.socket.emit('chat-message', this.state.chat.input);
            this.setState({ chat: { input: '' } });
        }
    }

    receiveMsg(msg) {
        const messages = [...this.state.messages];
        messages.push(msg);
        this.setState({ messages: messages });
        this.chatBox.current.scrollTop = this.chatBox.current.scrollHeight - this.chatBox.current.clientHeight;
    }

    playerConnected(name) {
        const messages = [...this.state.messages];
        messages.push({
            sender: 'Server',
            text: name + ' connected to server.'
        });
        this.setState({ messages: messages });
    }

    playerDisconnected(name) {
        const messages = [...this.state.messages];
        messages.push({
            sender: 'Server',
            text: name + ' disconnected from server.'
        });
        this.setState({ messages: messages });
    }

    render() {
        const lobby = (
            <div className="container-fluid">
                <PageTitle/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <Players players={ this.state.players }/>
                            <Settings settings={ this.state.settings }
                                      handler={ this.emitSettings }
                                      startGame={ this.changeGameState }
                                      gameId={ this.state.gameId }/>
                        </div>
                        <div className="col-sm">
                            <Chat messages={ this.state.messages }
                                  chatRef={ this.chatBox }
                                  onInput={ this.onChatInput }
                                  inputValue={ this.state.chat.input }
                                  newMsg={ this.sendMsg } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <JoiningLink gameId={this.state.gameId}/>
                        </div>
                    </div>
                </div>
            </div>
        );

        const game = (
            <div className="container-fluid">
                <PageTitle/>
                <div className="row">
                    <div className="col-sm">
                        <Players players={ this.state.players }/>
                    </div>
                    <div className="col-sm">
                        <Canvas/>
                        <Toolbar/>
                    </div>
                    <div className="col-sm">
                        <RoundDetails/>
                        <Chat messages={ this.state.messages }
                              chatRef={ this.chatBox }
                              onInput={ this.onChatInput }
                              inputValue={ this.state.chat.input }
                              newMsg={ this.sendMsg } />
                    </div>
                </div>
            </div>
        );

        return (
             game
        )
    }
}

export default Lobby;
