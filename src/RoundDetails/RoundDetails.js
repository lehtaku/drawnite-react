import React from 'react';

import ListTitle from "../List/ListTitle/ListTitle";

const RoundDetails = (props) => {
    return (
            <ul className="list-group">
                <ListTitle title="Round"/>
                <li className="list-group-item">
                    <div className="d-flex justify-content-around">
                        <span>Time: 60</span>
                        <span>Word: _ _ _ _ _</span>
                    </div>
                </li>
            </ul>
    );
};

export default RoundDetails;
