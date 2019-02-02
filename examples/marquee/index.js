import React, { Component } from 'react'
import Marquee from '../../modules/index'
import './index.css'

class MarqueePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loopData: [
        { txt: "这是一条数据1" }, 
        { txt: "这是一条数据2" }, 
        { txt: "这是一条数据3" }, 
        { txt: "这是一条数据4" },
        { txt: "这是一条数据5" }
      ]
    }
  }
  render() {
    let { loopData } = this.state;
    return (
      <div>
        <div className="type-title">默认横向滚动</div>
        <div className="box-landscape">
          <Marquee loopData={loopData} getMarquee={this.getLandscapeMarquee} />
        </div>
        <div className="botton" onClick={this.runlandscapeMarquee}>运动</div>
        <div className="botton" onClick={this.stoplandscapeMarquee}>暂停</div>


        <div className="type-title">竖向滚动</div>
        <div className="box-vertical">
          <Marquee loopData={loopData} getMarquee={this.getVerticalMarquee} direction='vertical' verticalItemHeight='60px' />
        </div>
        <div className="botton" onClick={this.runVerticalMarquee}>运动</div>
        <div className="botton" onClick={this.stopVerticalMarquee}>暂停</div>
      </div>
    )
  }

  // 横向
  getLandscapeMarquee = (params) => {
    this.landscapeMarqueeParams = params
  }

  stoplandscapeMarquee = () => {
    this.landscapeMarqueeParams.stopMarquee();
  }

  runlandscapeMarquee = () => {
    this.landscapeMarqueeParams.runMarquee();
  }

  //竖向
  getVerticalMarquee = (params) => {
    this.verticalMarqueeParams = params
  }

  stopVerticalMarquee = () => {
    this.verticalMarqueeParams.stopMarquee();
  }

  runVerticalMarquee = () => {
    this.verticalMarqueeParams.runMarquee();
  }

}

export default MarqueePage