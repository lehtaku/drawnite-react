import React, { Component } from 'react';

import './App.css';

import AppRouter from "./AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        )
    }
}

export default App;
