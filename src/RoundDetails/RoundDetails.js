import React from 'react';

import ListTitle from "../List/ListTitle/ListTitle";

const RoundDetails = (props) => {
    return (
            <ul className="list-group">
                <ListTitle title="Round"/>
                <li className="list-group-item">
                    <div className="d-flex justify-content-around">
                        <span><strong>Time:</strong> 60</span>
                        <span><strong>Word:</strong> {props.showWord && props.wordToGuess }
                        </span>
                    </div>
                </li>
            </ul>
    );
};

export default RoundDetails;
