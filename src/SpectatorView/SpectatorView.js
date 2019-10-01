import React from 'react';
import './SpectatorView.css'

const SpectatorView = (props) => {
    let imgSource = '';
    if (props.imgSrc === null || props.imgSrc === '' || props.imgSrc === undefined) {
        imgSource = process.env.PUBLIC_URL + '/img/blank-screen.png';
    } else {
        imgSource = props.imgSrc;
    }

    return (
        <img src={ imgSource }
             className="spectator-view"
             width={ 800 }
             height={ 600 }
             alt="Spectator View" />
    )
};

export default SpectatorView;
