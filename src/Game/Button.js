import React from 'react';

const ColorButton = (props) => {
    const styles = {
        backgroundColor: props.bgColor
    };

    const id = props.bgColor.slice(1);

    return (
        <button className="btn color-btn" type="button" id={id}
                style={ styles } />
    )
};

export default ColorButton;
