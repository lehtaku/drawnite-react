import React from 'react';
import { Route , Switch} from "react-router-dom";

import FrontPage from "../FrontPage/FrontPage";
import Lobby from "../Lobby/Lobby";
import Game from "../Game/Game";
import NotFound from "../NotFound/NotFound";

const AppRouter = () => {
    return (
        <Switch>
            <Route path="/" exact component={ FrontPage } />
            <Route path="/:lobbyId" exact component={ Lobby } />
            <Route path="/:lobbyId/play" exact component={ Game } />
            <Route component={NotFound} />
        </Switch>
    )
};

export default AppRouter;
