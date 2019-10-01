import React, { Component } from 'react';
import $ from 'jquery';

import './Canvas.css'
import Toolbar from "../Toolbar/Toolbar";
import ColorButton from "./Button";

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: '#FF4136',
            currentTool: 'brush',
            lineCap: 'round',
            lineWidth: 8,
            mouseDown: false,
            drawing: true,
            mouseX: 0,
            mouseY: 0
        };

        this.canvas = React.createRef();
        this.getCtx = this.getCtx.bind(this);
        this.setCursor = this.setCursor.bind(this);
        this.colorBtnHandler = this.colorBtnHandler.bind(this);
        this.toolBtnHandler = this.toolBtnHandler.bind(this);
        this.sizeBtnHandler = this.sizeBtnHandler.bind(this);
        this.canvasMouseEnter = this.canvasMouseEnter.bind(this);
        this.canvasMouseDown = this.canvasMouseDown.bind(this);
        this.canvasMouseMove = this.canvasMouseMove.bind(this);
        this.canvasMouseUp = this.canvasMouseUp.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
    }

    componentDidMount() {
        const ctx = this.getCtx();
        $('.color-btn#' + ctx.fillStyle.slice(1).toUpperCase()).addClass('active focus');
        $('.tool-btn#' + this.state.currentTool).addClass('active focus');
        $('.size-btn#' + ctx.lineWidth).addClass('active focus');
        $('.size-dot').css('background-color', ctx.strokeStyle);
        this.setCursor();
    }

    getCtx() {
        const ctx = this.canvas.current.getContext('2d');
        ctx.fillStyle = this.state.currentColor;
        ctx.lineWidth = this.state.lineWidth;
        ctx.lineCap = this.state.lineCap;
        return ctx;
    }

    setCursor() {
        const ctx = this.getCtx();
        let fixingNum = ctx.lineWidth / 2;
        if (this.state.currentTool === 'brush') {
            let cursorName = this.state.currentColor.toUpperCase().slice(1) + '-' + ctx.lineWidth + '.png';
            $('#drawCanvas').css('cursor', `url('${process.env.PUBLIC_URL + '/img/cursors/' + cursorName}') ${fixingNum - 1} ${fixingNum}, auto`);
            // ctx.strokeStyle = this.state.currentColor;
            $('.size-dot').css('background-color', this.state.currentColor);
        } else {
            $('#drawCanvas').css('cursor', `url('${process.env.PUBLIC_URL + '/img/eraser.png'}') 8 40, auto`);
            ctx.strokeStyle = '#FFFFFF'
        }
    }

    colorBtnHandler(event) {
        $('.color-btn#' + this.state.currentColor.slice(1).toUpperCase()).removeClass('active focus');
        $('.color-btn#' + event.target.id).addClass('active focus');
        this.setState({ currentColor: '#' + event.target.id }, () => this.setCursor());
    }

    toolBtnHandler(event) {
        event.preventDefault();
        $('.tool-btn#' + this.state.currentTool).removeClass('active focus');
        $('.tool-btn#' + event.currentTarget.id).addClass('active focus');
        this.setState({ currentTool:  event.currentTarget.id }, () => this.setCursor());
    }

    sizeBtnHandler(event) {
        event.preventDefault();
        $('.size-btn#' + this.state.lineWidth).removeClass('active focus');
        $('.size-btn#' + event.currentTarget.id).addClass('active focus');
        this.setState({ lineWidth: event.currentTarget.id }, () => this.setCursor());
    }

    canvasMouseEnter() {
        this.setState({ mouseDown: false });
    }

    canvasMouseDown(event) {
        event.persist();
        const ctx = this.getCtx();
        this.setState({
            mouseDown: true,
            mouseX: event.nativeEvent.offsetX,
            mouseY: event.nativeEvent.offsetY
        });
        ctx.beginPath();
        ctx.arc(event.nativeEvent.offsetX, event.nativeEvent.offsetY, ctx.lineWidth / 2, 0, 2 * Math.PI);
        ctx.fill();
        this.props.onDraw(this.canvas.current.toDataURL());
    }

    canvasMouseMove(event) {
        event.persist();
        if (this.state.mouseDown && this.state.drawing) {
            this.drawLine(this.state.mouseX, this.state.mouseY, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
            this.setState({
                mouseX: event.nativeEvent.offsetX,
                mouseY: event.nativeEvent.offsetY
            });
            this.props.onDraw(this.canvas.current.toDataURL());
        }
    }

    canvasMouseUp() {
        this.setState({ mouseDown: false });
    }

    clearCanvas() {
        const ctx = this.getCtx();
        ctx.clearRect(0, 0, 800, 600);
    }

    drawLine(fromX, fromY, toX, toY) {
        const ctx = this.getCtx();
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = this.state.currentColor;
        ctx.stroke();
    }

    render() {
        return (
            <div onMouseEnter={ this.canvasMouseEnter }
                 id="canvas-wrapper">
                <canvas ref={ this.canvas }
                        onMouseDown={ this.canvasMouseDown }
                        onMouseMove={ this.canvasMouseMove }
                        onMouseUp={ this.canvasMouseUp }
                        id="drawCanvas"
                        width={ 800 }
                        height={ 600 } />
                    <Toolbar
                        colorHandler={ this.colorBtnHandler }
                        toolHandler={ this.toolBtnHandler }
                        sizeHandler={ this.sizeBtnHandler }
                        clearHandler={ this.clearCanvas }/>
            </div>
        )
    }
}

export default Canvas;
