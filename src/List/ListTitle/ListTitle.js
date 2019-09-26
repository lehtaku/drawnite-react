import React from 'react';

const ListTitle = (props) => {
    return (
        <li className="list-group-item list-title active">{ props.title }</li>
    )
};

export default ListTitle;
