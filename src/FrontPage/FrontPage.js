import React, { Component } from 'react';
import Axios from "axios";

class FrontPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameId: ''
        };

        this.createPrivateRoom = this.createPrivateRoom.bind(this);
    }

    async createPrivateRoom(event) {
        event.preventDefault();
        await Axios.get('http://localhost:9000/api/v1/game/new-game')
            .then(newGame => this.setState({ gameId: newGame.data._id }));
        this.props.history.push('/game/' + this.state.gameId);
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div className="jumbotron">
                            <h1 className="display-4">Drawnite</h1>
                            <p className="lead">Draw & Guess game</p>
                            <hr className="my-4" />
                            <p>Ready to rock?</p>
                            <button type="button" onClick={ this.createPrivateRoom } className="btn btn-outline-primary">Create private room</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FrontPage;

