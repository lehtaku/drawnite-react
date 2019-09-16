import React from 'react';

const Settings = () => {
    return(
        <ul className="list-group">
            <li className="list-group-item list-title active">Game settings</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Rounds
                <span className="badge badge-primary badge-pill">3</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Draw time in seconds
                <span className="badge badge-primary badge-pill"> 60</span>
            </li>
        </ul>
    )
};

export default Settings;
