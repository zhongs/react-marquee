import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../utils/raf'
import './marquee.css';

utils.raf();

export default class Marquee extends Component {
  static defaultProps = {
    direction: 'landscape',
    verticalItemHeight: '60px',
    speed: 2,
    reverse: false,
    hoverPause: false,
    autoPlay: true,
    onClick: null
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
    if (this.props.autoPlay) {
      this.runMarquee();
    }
  }

  //横向滚动
  landscapeMarquee = () => {
    const { speed, reverse } = this.props;
    if (reverse) {
      // 反向滚动
      if (this.domMw.scrollLeft <= 0) {
        this.domMw.scrollLeft = this.domMi.scrollWidth;
      } else {
        this.domMw.scrollLeft -= speed;
      }
    } else {
      // 正向滚动
      if (this.domMw.scrollLeft >= this.domMi.scrollWidth) {
        this.domMw.scrollLeft = 0;
      } else {
        this.domMw.scrollLeft += speed;
      }
    }
    this.timerMarquee = requestAnimationFrame(this.landscapeMarquee);
  }

  //竖向滚动
  verticalMarquee = () => {
    const { speed, reverse } = this.props;
    if (reverse) {
      // 反向滚动
      if (this.domMw.scrollTop <= 0) {
        this.domMw.scrollTop = this.domMi.scrollHeight;
      } else {
        this.domMw.scrollTop -= speed;
      }
    } else {
      // 正向滚动
      if (this.domMw.scrollTop >= this.domMi.scrollHeight) {
        this.domMw.scrollTop = 0;
      } else {
        this.domMw.scrollTop += speed;
      }
    }
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

  handleMouseEnter = () => {
    if (this.props.hoverPause) {
      this.stop();
    }
  }

  handleMouseLeave = () => {
    if (this.props.hoverPause) {
      this.start();
    }
  }

  handleItemClick = (item, index) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(item, index);
    }
  }

  componentDidMount = () => {
    this.initMarquee();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    this.stopMarquee();
  }

  start = () => {
    this.runMarquee();
  }

  stop = () => {
    this.stopMarquee();
  }

  renderLandscapeMarquee() {
    let { loopData, hoverPause } = this.props;

    return (
      <div 
        className={`marquee-landscape-wrap${hoverPause ? ' hover-pause' : ''}`}
        ref={(mw) => { this.domMw = mw; }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="marquee-landscape-item" ref={(mi) => { this.domMi = mi; }}>
          {loopData.map((item, index) => (
            <div 
              className={`marquee-landscape-txt${hoverPause ? ' hover-pause' : ''}`}
              key={index}
              onClick={() => this.handleItemClick(item, index)}
            >
              {item.txt}
            </div>
          ))}
        </div>
        <div className="marquee-landscape-item">
          {loopData.map((item, index) => (
            <div 
              className={`marquee-landscape-txt${hoverPause ? ' hover-pause' : ''}`}
              key={index}
              onClick={() => this.handleItemClick(item, index)}
            >
              {item.txt}
            </div>
          ))}
        </div>
      </div>
    )
  }

  renderVerticalMarquee() {
    let { loopData, verticalItemHeight, hoverPause } = this.props;
    return (
      <div 
        className={`marquee-vertical-wrap${hoverPause ? ' hover-pause' : ''}`}
        ref={(mw) => { this.domMw = mw; }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="marquee-vertical-item" ref={(mi) => { this.domMi = mi; }}>
          {loopData.map((item, index) => (
            <div 
              style={{ height: verticalItemHeight, lineHeight: verticalItemHeight }} 
              className={`marquee-vertical-txt${hoverPause ? ' hover-pause' : ''}`}
              key={index}
              onClick={() => this.handleItemClick(item, index)}
            >
              {item.txt}
            </div>
          ))}
        </div>
        <div className="marquee-vertical-item">
          {loopData.map((item, index) => (
            <div 
              style={{ height: verticalItemHeight, lineHeight: verticalItemHeight }} 
              className={`marquee-vertical-txt${hoverPause ? ' hover-pause' : ''}`}
              key={index}
              onClick={() => this.handleItemClick(item, index)}
            >
              {item.txt}
            </div>
          ))}
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
  direction: PropTypes.string,
  verticalItemHeight: PropTypes.string,
  speed: PropTypes.number,
  reverse: PropTypes.bool,         // 是否反向滚动
  hoverPause: PropTypes.bool,     // 是否启用鼠标移入暂停
  autoPlay: PropTypes.bool,       // 是否自动开始滚动
  onClick: PropTypes.func         // 点击项目时的回调
};