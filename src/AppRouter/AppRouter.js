import React from 'react';
import { Route , Switch} from "react-router-dom";

import FrontPage from "../FrontPage/FrontPage";
import Lobby from "../Lobby/Lobby";
import Canvas from "../Canvas/Canvas";
import NotFound from "../NotFound/NotFound";

const AppRouter = () => {
    return (
        <Switch>
            <Route path="/" exact component={ FrontPage } />
            <Route path="/game/:gameId" exact component={ Lobby } />
            <Route path="/game/:gameId/play" exact component={ Canvas } />
            <Route component={NotFound} />
        </Switch>
    )
};

export default AppRouter;
