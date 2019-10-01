import React, { Component } from 'react';
import SocketIO from 'socket.io-client';
import Axios from "axios";
import './Lobby.css'

import PageTitle from "../PageTitle/PageTitle";
import Players from "../Players/Players";
import Chat from "../Chat/Chat";
import Settings from "../Settings/Settings";
import JoiningLink from "../JoiningLink/JoiningLink";
import Canvas from "../Canvas/Canvas";
import RoundDetails from "../RoundDetails/RoundDetails";
import SpectatorView from "../SpectatorView/SpectatorView";
import UsernameModal from "../Modal/UsernameModal";
import WordsModal from "../Modal/WordsModal";

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: props.match.params.gameId,
            gameOn: false,
            drawerSocket: '',
            settings: {},
            players: [],
            askUsername: false,
            askWord: false,
            wordsToSelect: [],
            wordToGuess: '',
            currentRound: 1,
            chat: {
                input: '',
                messages: []
            },
            messages: [],
            canvasDataUrl: ''
        };

        this.socket = SocketIO.connect('http://localhost:9000?token=' + props.match.params.gameId)
            .on('ask-name', () => this.setState({ askUsername: true }))
            .on('ask-word', (words) => this.setState({ askWord: true, wordsToSelect: words }))
            .on('players-changed', players => this.setState({ players: players }))
            .on('start-round', (wordToGuess) => this.startRound(wordToGuess))
            .on('new-settings', settings => this.setState({ settings: settings }))
            .on('state-changed', game => this.setState({ gameOn: game.gameOn, drawerSocket: game.drawerSocket }))
            .on('player-connected', name => this.playerConnected(name))
            .on('send-canvas', canvasDataUrl => this.receiveDrawing(canvasDataUrl))
            .on('player-disconnected', name => this.playerDisconnected(name))
            .on('chat-message', msg => this.receiveMsg(msg));

        this.chatBox = React.createRef();
        this.changeGameState = this.changeGameState.bind(this);
        this.onChatInput = this.onChatInput.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.receiveMsg = this.receiveMsg.bind(this);
        this.onCanvasDraw = this.onCanvasDraw.bind(this);
        this.receiveDrawing = this.receiveDrawing.bind(this);
        this.startRound = this.startRound.bind(this);
    }

    async componentDidMount() {
        const game = await Axios.get('http://localhost:9000/api/v1/game/' + this.state.gameId);
        this.setState({
            gameOn: game.data.gameOn,
            settings: game.data.settings,
        });
    }

    startRound(wordToGuess) {
        this.setState({ wordToGuess: wordToGuess });
    }

    changeGameState() {
        this.socket.emit('change-state', this.state.gameOn);
    }

    onChatInput(ev) {
        this.setState({ chat: { input: ev.target.value } });
    }

    sendMsg(ev) {
        ev.preventDefault();
        if (this.state.chat.input.length > 0) {
            this.socket.emit('chat-message', this.state.chat.input);
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

    onCanvasDraw(dataUrl) {
        this.socket.emit('drawing', dataUrl);
    }

    receiveDrawing(dataUrl) {
        this.setState({ canvasDataUrl: dataUrl });
    }

    render() {
        const isThisClientsTurn = this.state.drawerSocket === this.socket.id;

        const lobby = (
            <div className="container-fluid">
                {this.state.askUsername &&
                    <UsernameModal onSubmit={ (userName) => this.socket.emit('set-username', userName) }/>
                }
                <PageTitle/>
                <div className="lobby">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <Players players={ this.state.players }/>
                                <Settings settings={ this.state.settings }
                                          handler={ (settings) => this.socket.emit('settings-changed', settings) }
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
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <JoiningLink gameId={this.state.gameId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        const game = (
            <div className="container-fluid">
                {isThisClientsTurn &&
                <WordsModal wordsToSelect={this.state.wordsToSelect}
                            handler={(word) => this.socket.emit('select-word', word)}/>
                }
                <PageTitle/>
                <div className="game">
                    <div className="row">
                        <div className="col-sm">
                            <Players players={ this.state.players }/>
                        </div>
                        <div className="col-sm">
                            {isThisClientsTurn ? (
                                <Canvas
                                    onDraw={ this.onCanvasDraw } />
                            ) : (
                                <SpectatorView imgSrc={ this.state.canvasDataUrl } />
                            )}
                        </div>
                        <div className="col-sm">
                            <RoundDetails wordToGuess={ this.state.wordToGuess }
                                          showWord={ isThisClientsTurn }/>
                            <Chat messages={ this.state.messages }
                                  chatRef={ this.chatBox }
                                  onInput={ this.onChatInput }
                                  inputValue={ this.state.chat.input }
                                  newMsg={ this.sendMsg } />
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {this.state.gameOn ? (
                    game
                ) : (
                    lobby
                )}
            </div>
        )
    }
}

export default Lobby;
