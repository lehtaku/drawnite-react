import React, { Component } from 'react';
import $ from 'jquery';

import ColorButton from "./Button";

import './Game.css'

class Game extends Component {
    componentDidMount() {
            /*
             * Initializations
             */
            let currentColor = '#FF4136';
            let currentTool = 'brush';

            let ctx = document.getElementById('drawCanvas').getContext('2d');
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.strokeStyle = currentColor;

            let mouseDown = false;
            let drawing = true;
            let mouseX = 0;
            let mouseY = 0;

            $('.color-btn#' + ctx.strokeStyle.slice(1).toUpperCase()).addClass('active focus');
            $('.tool-btn#' + currentTool).addClass('active focus');
            $('.size-btn#' + ctx.lineWidth).addClass('active focus');
            $('.size-dot').css('background-color', ctx.strokeStyle);
            setCursor();


            function setCursor() {
                let fixingNum = ctx.lineWidth / 2;
                if (currentTool === 'brush') {
                    let cursorName = currentColor.toUpperCase().slice(1) + '-' + ctx.lineWidth + '.png';
                    $('#canvas').css('cursor', `url('./cursors/${cursorName}') ${fixingNum} ${fixingNum}, auto`);
                    ctx.strokeStyle = currentColor
                } else {
                    $('#canvas').css('cursor', `url('./cursors/eraser.png') 8 40, auto`);
                    ctx.strokeStyle = '#FFFFFF'
                }
            }

            /*
             * Toolbar
             */
            $('.color-btn').click(function () {
                $(this).addClass('active focus');
                $('.color-btn#' + ctx.strokeStyle.slice(1).toUpperCase()).removeClass('active focus');
                currentColor = '#' + $(this).attr('id');
                $('.size-dot').css('background-color', currentColor);
                ctx.strokeStyle = currentColor;
                setCursor()
            });

            $('.tool-btn').click(function () {
                $(this).addClass('active focus');
                $('.tool-btn#' + currentTool).removeClass('active focus');
                currentTool = $(this).attr('id');
                setCursor()
            });

            $('.size-btn').click(function () {
                $(this).addClass('active');
                $('.size-btn#' + ctx.lineWidth).removeClass('active focus');
                let btnId = $(this).attr('id');
                ctx.lineWidth = parseInt(btnId);
                setCursor()
            });

            /*
             * Canvas
             */
            $('#canvas-wrapper')
                .mouseenter(function () {
                    mouseDown = false
                });

            $('#drawCanvas').mousedown(function (event) {
                mouseDown = true;
                ctx.beginPath();
                ctx.arc(event.offsetX, event.offsetY, 1, 0, 2 * Math.PI);
                ctx.stroke();

                mouseX = event.offsetX;
                mouseY = event.offsetY
            }).mousemove(function (event) {
                if (mouseDown && drawing) {
                    drawLine(mouseX, mouseY, event.offsetX, event.offsetY);
                    mouseX = event.offsetX;
                    mouseY = event.offsetY
                }
            }).mouseup(function () {
                mouseDown = false
            });

            function drawLine(fromX, fromY, toX, toY) {
                ctx.beginPath();
                ctx.moveTo(fromX, fromY);
                ctx.lineTo(toX, toY);
                ctx.stroke()
            }

            $('#clear').click(function () {
                ctx.clearRect(0, 0, 800, 600)
            })
    }

    render() {
        return (
            <div>
                <div className="container toolbar">
                    <div className="row h-100">

                        <div className="col-sm mx-auto my-auto">
                            <ColorButton bgColor="#FF4136"/>
                            <ColorButton bgColor="#0074D9"/>
                            <ColorButton bgColor="#FFDC00"/>
                            <ColorButton bgColor="#2ECC40"/>
                            <ColorButton bgColor="#111111"/>
                            <ColorButton bgColor="#AAAAAA"/>
                            <ColorButton bgColor="#B10DC9"/>
                            <ColorButton bgColor="#FF851B"/>
                            <ColorButton bgColor="#A04000"/>
                            <ColorButton bgColor="#FDFEFE"/>
                            <ColorButton bgColor="#85C1E9"/>
                            <ColorButton bgColor="#4A235A"/>
                        </div>

                        <div className="col-sm my-auto mx-auto">
                            <button type="button" id="brush" className="btn tool-btn btn-light"><img
                                src={process.env.PUBLIC_URL + '/img/pencil.png'} alt="Pencil" /></button>
                            <button type="button" id="eraser" className="btn tool-btn btn-light"><img
                                src={process.env.PUBLIC_URL + '/img/eraser.png'} alt="Eraser" /></button>
                        </div>

                        <div className="col-sm my-auto mx-auto">
                            <button type="button" id="2" className="btn size-btn btn-light">
                                <span className="size-dot dot-2"/>
                            </button>
                            <button type="button" id="8" className="btn size-btn btn-light">
                                <span className="size-dot dot-8"/>
                            </button>
                            <button type="button" id="16" className="btn size-btn btn-light">
                                <span className="size-dot dot-16"/>
                            </button>
                            <button type="button" id="32" className="btn size-btn btn-light">
                                <span className="size-dot dot-32"/>
                            </button>
                            <button type="button" id="48" className="btn size-btn btn-light">
                                <span className="size-dot dot-48"/>
                            </button>
                        </div>

                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div id="canvas-wrapper" className="col-sm">
                            <div id="canvas">
                                <canvas id="drawCanvas" width="800" height="600"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <button type="button" id="clear" className="btn btn-warning">Reset drawing</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;
