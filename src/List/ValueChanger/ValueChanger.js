import React from 'react';

import './ValueChanger.css';

const ValueChanger = (props) => {

    const sendIncreased = () => {
        if (props.type === 'selector') {
            props.handler(props.value + 15);
        } else {
            props.handler(props.value + 1);
        }
    };

    const sendDecreased = () => {
        if (props.type === 'selector') {
            props.handler(props.value - 15);
        } else {
            props.handler(props.value - 1);
        }
    };

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-center">
                <strong>{ props.settingName }</strong>
            </div>

            <div className="d-flex justify-content-between">
                <img alt="Left-Arrow" onClick={ sendDecreased } src={process.env.PUBLIC_URL + '/img/arrow-left.png'} className="arrow-icon"/>
                <i>{ props.value }</i>
                <img alt="Right-Arrow" onClick={ sendIncreased } src={process.env.PUBLIC_URL + '/img/arrow-right.png'} className="arrow-icon"/>
            </div>
        </li>
    )
};

export default ValueChanger;
