import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Axios from "axios";

class FrontPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            lobbyId: ''
        };
        this.userNameHandler = this.userNameHandler.bind(this);
    }

    componentDidMount() {
        Axios.get('http://localhost:9000/lobby')
            .then(newGame => this.setState({ lobbyId: newGame.data.id }));
    }

    userNameHandler(event) {
        this.setState({ userName: event.target.value })
    }

    render() {
        return (
            <Link to={ '/' + this.state.lobbyId }>
                <button type="button" className="btn btn-primary">Create Game</button>
            </Link>
        )
    }
}

export default FrontPage;

