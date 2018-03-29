import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../utils/raf'
import './index.css';

utils.raf();

export default class Marquee extends Component {
    static defaultProps = {
        loop: false
    }

    constructor(props) {
        super(props);

        this.timerMarquee = null;
        this.domMi = null;
        this.domMw = null;

        this.state = {};
    }

    marquee = () => {
        this.domMw.scrollLeft >= this.domMi.scrollWidth ? this.domMw.scrollLeft = 0 : this.domMw.scrollLeft++;
        this.timerMarquee = requestAnimationFrame(this.marquee);
    }

    initMarquee = () => {
        this.timerMarquee && this.stopMarquee();
        this.runMarquee();
    }

    // 运动
    runMarquee = () => {
        this.timerMarquee && this.stopMarquee();
        this.timerMarquee = requestAnimationFrame(this.marquee);
    }

    //暂停
    stopMarquee = () => {
        cancelAnimationFrame(this.timerMarquee)
    }

    componentDidMount = () => {
        this.initMarquee();

        let {getMarquee} = this.props

        getMarquee && getMarquee({
            runMarquee: this.runMarquee,
            stopMarquee: this.stopMarquee
        });
      
    }

    render() {

        let { loop, loopData } = this.props;
        let { marqueeWidth } = this.state;

        return (
            <div className="react-marquee-box">
                <div className="marquee-wrap" ref={(mw) => { this.domMw = mw; }}>
                    <div className="marquee-item" ref={(mi) => { this.domMi = mi; }}>
                        {loopData.map((item, index) => (<div className="marquee-txt" key={index}>{item.txt}</div>))}
                    </div>
                    <div className="marquee-item">
                        {loopData.map((item, index) => (<div className="marquee-txt" key={index}>{item.txt}</div>))}
                    </div>
                </div>
            </div >
        )
    }
}

Marquee.propTypes = {
    loop: PropTypes.bool,
    loopData: PropTypes.array,
    getMarquee: PropTypes.func
};