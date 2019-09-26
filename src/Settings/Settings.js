import React from 'react';

import ListTitle from "../List/ListTitle/ListTitle";
import ValueChanger from "../List/ValueChanger/ValueChanger";
import ListButton from "../List/ListButton/ListButton";

const Settings = (props) => {
    let settings = { ...props.settings };

    function roundsHandler(rounds) {
        if (rounds < 1) rounds = 6;
        if (rounds > 6) rounds = 1;
        settings.rounds = rounds;
        props.handler(settings);
    }

    function roundTimeHandler(drawTime) {
        if (drawTime < 30) drawTime = 120;
        if (drawTime > 120) drawTime = 30;
        settings.drawTime = drawTime;
        props.handler(settings);
    }

    return(
        <ul className="list-group">
            <ListTitle title="Game Settings"/>
            <ValueChanger value={ settings.rounds }
                          handler={ roundsHandler }
                          settingName="Rounds"/>
            <ValueChanger value={ settings.drawTime }
                          handler={ roundTimeHandler }
                          type="selector"
                          settingName="Draw time in seconds"/>
            <ListButton handler={ props.startGame }/>
        </ul>
    )
};

export default Settings;
