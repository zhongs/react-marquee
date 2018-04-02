import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../utils/raf'
import './marquee_landscape.css';
import './marquee_vertical.css';

utils.raf();

export default class Marquee extends Component {
    static defaultProps = {
        direction: 'landscape',
        verticalItemHeight: '60px'
    }

    constructor(props) {
        super(props);

        this.timerMarquee = null;
        this.domMi = null;
        this.domMw = null;

        this.state = {};
    }

    initMarquee = () => {
        this.stopMarquee();
        this.runMarquee();
    }

    //横向滚动
    landscapeMarquee = () => {
        this.domMw.scrollLeft >= this.domMi.scrollWidth ? this.domMw.scrollLeft = 0 : this.domMw.scrollLeft++;
        this.timerMarquee = requestAnimationFrame(this.landscapeMarquee);
    }

    //竖向滚动
    verticalMarquee = () => {
        this.domMw.scrollTop >= this.domMi.scrollHeight ? this.domMw.scrollTop = 0 : this.domMw.scrollTop++;
        this.timerMarquee = requestAnimationFrame(this.verticalMarquee);
    }

    // 运动
    runMarquee = () => {
        this.stopMarquee();
        if (this.props.direction === 'vertical') {
            this.timerMarquee = requestAnimationFrame(this.verticalMarquee);
        } else {
            this.timerMarquee = requestAnimationFrame(this.landscapeMarquee);
        }
    }

    //暂停
    stopMarquee = () => {
        this.timerMarquee && cancelAnimationFrame(this.timerMarquee)
    }

    componentDidMount = () => {
        this.initMarquee();

        let { getMarquee } = this.props

        getMarquee && getMarquee({
            runMarquee: this.runMarquee,
            stopMarquee: this.stopMarquee
        });

    }

    componentWillUnmount = ()=>{
        this.stopMarquee();
    }

    renderLandscapeMarquee() {
        let { loopData } = this.props;

        return (
            <div className="marquee-landscape-wrap" ref={(mw) => { this.domMw = mw; }}>
                <div className="marquee-landscape-item" ref={(mi) => { this.domMi = mi; }}>
                    {loopData.map((item, index) => (<div className="marquee-landscape-txt" key={index}>{item.txt}</div>))}
                </div>
                <div className="marquee-landscape-item">
                    {loopData.map((item, index) => (<div className="marquee-landscape-txt" key={index}>{item.txt}</div>))}
                </div>
            </div>
        )
    }

    renderVerticalMarquee() {
        let { loopData,verticalItemHeight } = this.props;
        return (
            <div className="marquee-vertical-wrap" ref={(mw) => { this.domMw = mw; }}>
                <div className="marquee-vertical-item" ref={(mi) => { this.domMi = mi; }}>
                    {loopData.map((item, index) => (<div style={{height:verticalItemHeight, lineHeight:verticalItemHeight}} className="marquee-vertical-txt" key={index}>{item.txt}</div>))}
                </div>
                <div className="marquee-vertical-item">
                    {loopData.map((item, index) => (<div style={{height:verticalItemHeight, lineHeight:verticalItemHeight}} className="marquee-vertical-txt" key={index}>{item.txt}</div>))}
                </div>
            </div>
        )
    }

    render() {

        let { direction } = this.props;

        return (
            <div className="react-marquee-box">
                {direction === 'landscape' ? this.renderLandscapeMarquee() : this.renderVerticalMarquee()}
            </div>
        )
    }
}

Marquee.propTypes = {
    loop: PropTypes.bool,
    loopData: PropTypes.array,
    getMarquee: PropTypes.func,
    direction: PropTypes.string,
    verticalItemHeight: PropTypes.string
};