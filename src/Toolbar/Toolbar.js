import React from 'react';
import './Toolbar.css';

import ColorButton from "../Canvas/Button";

const Toolbar = (props) => {
    return (
        <div className="container toolbar">
            <div className="row">
                <div className="col-sm my-auto mx-auto">
                    <ColorButton onClick={ props.colorHandler } bgColor="#FF4136"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#0074D9"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#FFDC00"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#2ECC40"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#111111"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#AAAAAA"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#B10DC9"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#FF851B"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#A04000"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#FDFEFE"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#85C1E9"/>
                    <ColorButton onClick={ props.colorHandler } bgColor="#4A235A"/>
                </div>

                <div className="col-sm my-auto mx-auto">
                    <button onClick={ props.toolHandler } type="button" id="brush" className="btn tool-btn btn-light"><img
                        src={process.env.PUBLIC_URL + '/img/pencil.png'} alt="Pencil" /></button>
                    <button onClick={ props.toolHandler } type="button" id="eraser" className="btn tool-btn btn-light"><img
                        src={process.env.PUBLIC_URL + '/img/eraser.png'} alt="Eraser" /></button>
                    <button onClick={ props.clearHandler } type="button" id="trash" className="btn tool-btn btn-light"><img
                        src={process.env.PUBLIC_URL + '/img/trash.png'} alt="Trash" /></button>
                </div>

                <div className="col-sm my-auto mx-auto">
                    <button onClick={ props.sizeHandler } type="button" id="2" className="btn size-btn btn-light">
                        <span className="size-dot dot-2"/>
                    </button>
                    <button onClick={ props.sizeHandler } type="button" id="8" className="btn size-btn btn-light">
                        <span className="size-dot dot-8"/>
                    </button>
                    <button onClick={ props.sizeHandler } type="button" id="16" className="btn size-btn btn-light">
                        <span className="size-dot dot-16"/>
                    </button>
                    <button onClick={ props.sizeHandler } type="button" id="32" className="btn size-btn btn-light">
                        <span className="size-dot dot-32"/>
                    </button>
                    <button onClick={ props.sizeHandler } type="button" id="48" className="btn size-btn btn-light">
                        <span className="size-dot dot-48"/>
                    </button>
                </div>

            </div>
        </div>
    )
};

export default Toolbar;
