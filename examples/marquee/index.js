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
      ],
      reverseData: [
        { txt: '反向滚动示例1 ←' },
        { txt: '反向滚动示例2 ←' },
        { txt: '反向滚动示例3 ←' },
        { txt: '反向滚动示例4 ←' },
        { txt: '反向滚动示例5 ←' },
      ],
      lastClickedItem: null,
      lastClickedIndex: null
    }

    // 创建 refs
    this.landscapeMarqueeRef = React.createRef();
    this.verticalMarqueeRef = React.createRef();
    this.reverseMarqueeRef = React.createRef();
    this.manualMarqueeRef = React.createRef();
    this.clickMarqueeRef = React.createRef();
  }

  renderCode(code) {
    return (
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    )
  }

  // 计算动态速度
  calculateSpeed = (data) => {
    // 获取容器宽度
    const container = document.querySelector('.box-landscape');
    const containerWidth = container ? container.clientWidth : 500;
    
    // 计算所有item的文本总长度（假设每个中文字符宽度为16px，英文字符宽度为8px）
    const totalLength = data.reduce((acc, item) => {
      const text = item.txt;
      let pixelLength = 0;
      for (let i = 0; i < text.length; i++) {
        // 检查是否是中文字符
        if (/[\u4e00-\u9fa5]/.test(text[i])) {
          pixelLength += 16;  // 中文字符宽度
        } else {
          pixelLength += 8;   // 英文字符宽度
        }
      }
      return acc + pixelLength;
    }, 0);

    // 基础速度计算
    const contentRatio = totalLength / containerWidth;
    const baseSpeed = Math.log2(contentRatio + 1) * 2;
    const finalSpeed = Math.max(1, Math.min(10, baseSpeed));
    
    return Number(finalSpeed.toFixed(2));
  }

  // 添加防抖函数
  debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  componentDidMount() {
    this.handleResize = this.debounce(() => {
      this.forceUpdate();
    }, 200);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // 手动控制示例
  stopManualMarquee = () => {
    if (this.manualMarqueeRef.current) {
      this.manualMarqueeRef.current.stop();
    }
  }

  runManualMarquee = () => {
    if (this.manualMarqueeRef.current) {
      this.manualMarqueeRef.current.start();
    }
  }

  handleMarqueeClick = (item, index) => {
    this.setState({
      lastClickedItem: item,
      lastClickedIndex: index
    });
  }

  render() {
    let { loopData, reverseData, lastClickedItem, lastClickedIndex } = this.state;

    const codeExample = `// 根据内容长度动态计算速度
const calculateSpeed = (data) => {
  // 获取容器宽度
  const container = document.querySelector('.box-landscape');
  const containerWidth = container ? container.clientWidth : 500;
  
  // 计算所有item的文本总长度
  const totalLength = data.reduce((acc, item) => {
    const text = item.txt;
    let pixelLength = 0;
    for (let i = 0; i < text.length; i++) {
      if (/[\\u4e00-\\u9fa5]/.test(text[i])) {
        pixelLength += 16;  // 中文字符宽度
      } else {
        pixelLength += 8;   // 英文字符宽度
      }
    }
    return acc + pixelLength;
  }, 0);

  const contentRatio = totalLength / containerWidth;
  const baseSpeed = Math.log2(contentRatio + 1) * 2;
  return Math.max(1, Math.min(10, baseSpeed));
};`;

    return (
      <div className="demo-container">
        <h1>React Marquee 演示</h1>
        
        <section className="demo-section">
          <h2 className="type-title">1. 默认横向滚动</h2>
          <div className="demo-box">
            <div className="preview">
              <div className="box-landscape">
                <Marquee 
                  ref={this.landscapeMarqueeRef}
                  loopData={loopData} 
                  speed={2}
                />
              </div>
              <div className="controls">
                <button className="button" onClick={() => { if(this.landscapeMarqueeRef.current) this.landscapeMarqueeRef.current.start() }}>开始</button>
                <button className="button" onClick={() => { if(this.landscapeMarqueeRef.current) this.landscapeMarqueeRef.current.stop() }}>暂停</button>
              </div>
            </div>
            <div className="code">
              {this.renderCode(
`<Marquee 
  loopData={[
    { txt: "这是一条数据1" }, 
    { txt: "这是一条数据2" }
  ]} 
  speed={2}
/>`
              )}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="type-title">2. 竖向滚动</h2>
          <div className="demo-box">
            <div className="preview">
              <div className="box-vertical">
                <Marquee 
                  ref={this.verticalMarqueeRef}
                  loopData={loopData} 
                  direction='vertical' 
                  verticalItemHeight='60px' 
                />
              </div>
              <div className="controls">
                <button className="button" onClick={() => { if(this.verticalMarqueeRef.current) this.verticalMarqueeRef.current.start() }}>开始</button>
                <button className="button" onClick={() => { if(this.verticalMarqueeRef.current) this.verticalMarqueeRef.current.stop() }}>暂停</button>
              </div>
            </div>
            <div className="code">
              {this.renderCode(
`<Marquee 
  loopData={loopData}
  direction='vertical'
  verticalItemHeight='60px'
/>`
              )}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="type-title">3. 动态速度</h2>
          <div className="demo-box">
            <div className="preview">
              <div className="box-landscape">
                <Marquee 
                  ref={this.customSpeedMarqueeRef}
                  loopData={loopData} 
                  speed={this.calculateSpeed(loopData)}
                />
              </div>
              <div className="controls">
                <button className="button" onClick={() => { if(this.customSpeedMarqueeRef.current) this.customSpeedMarqueeRef.current.start() }}>开始</button>
                <button className="button" onClick={() => { if(this.customSpeedMarqueeRef.current) this.customSpeedMarqueeRef.current.stop() }}>暂停</button>
              </div>
            </div>
            <div className="code">
              {this.renderCode(codeExample)}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="type-title">4. 反向滚动</h2>
          <div className="demo-box">
            <div className="preview">
              <div className="box-landscape">
                <Marquee 
                  ref={this.reverseMarqueeRef}
                  loopData={reverseData} 
                  reverse={true}
                  speed={3}
                />
              </div>
              <div className="controls">
                <button className="button" onClick={() => { if(this.reverseMarqueeRef.current) this.reverseMarqueeRef.current.start() }}>开始</button>
                <button className="button" onClick={() => { if(this.reverseMarqueeRef.current) this.reverseMarqueeRef.current.stop() }}>暂停</button>
              </div>
            </div>
            <div className="code">
              {this.renderCode(
`<Marquee 
  loopData={[
    { txt: "反向滚动示例1 ←" }, 
    { txt: "反向滚动示例2 ←" }
  ]} 
  reverse={true}
  speed={3}
/>`
              )}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="type-title">5. 鼠标移入暂停</h2>
          <div className="demo-box">
            <div className="preview">
              <div className="box-landscape">
                <Marquee 
                  ref={this.hoverMarqueeRef}
                  loopData={loopData} 
                  hoverPause={true}
                  speed={2}
                />
              </div>
              <div className="description">
                <p>将鼠标移入内容区域暂停滚动，移出后继续</p>
              </div>
            </div>
            <div className="code">
              {this.renderCode(
`<Marquee 
  loopData={[
    { txt: "这是一条数据1" }, 
    { txt: "这是一条数据2" }
  ]} 
  hoverPause={true}
  speed={2}
/>`
              )}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="type-title">6. 手动控制</h2>
          <div className="demo-box">
            <div className="preview">
              <div className="box-landscape">
                <Marquee 
                  ref={this.manualMarqueeRef}
                  loopData={loopData} 
                  autoPlay={false}
                  speed={2}
                />
              </div>
              <div className="controls">
                <button className="button" onClick={this.runManualMarquee}>开始</button>
                <button className="button" onClick={this.stopManualMarquee}>暂停</button>
              </div>
              <div className="description">
                <p>初始化时不自动滚动，需要手动控制开始和暂停</p>
              </div>
            </div>
            <div className="code">
              {this.renderCode(
`<Marquee 
  loopData={[
    { txt: "这是一条数据1" }, 
    { txt: "这是一条数据2" }
  ]} 
  autoPlay={false}
  speed={2}
/>`
              )}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="type-title">7. 点击事件</h2>
          <div className="demo-box">
            <div className="preview">
              <div className="box-landscape">
                <Marquee 
                  ref={this.clickMarqueeRef}
                  loopData={loopData} 
                  onClick={this.handleMarqueeClick}
                  hoverPause={true}
                  speed={2}
                />
              </div>
              <div className="description">
                <p>支持通过 ref 获取组件实例来控制滚动，实例提供 start() 和 stop() 方法</p>
                <p>点击滚动项目时会触发回调，并显示在下方：</p>
                <div id="click-result" className="click-result">
                  {lastClickedItem ? (
                    <p>最后点击：{lastClickedItem.txt} (索引: {lastClickedIndex})</p>
                  ) : (
                    <p>尚未点击任何项目</p>
                  )}
                </div>
              </div>
            </div>
            <div className="code">
              {this.renderCode(
`<Marquee 
  loopData={[
    { txt: "这是一条数据1" }, 
    { txt: "这是一条数据2" }
  ]} 
  onClick={(item, index) => {
    console.log(\`点击了第\${index + 1}项: \${item.txt}\`);
  }}
  hoverPause={true}
  speed={2}
/>`
              )}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="type-title">配置参数说明</h2>
          <table className="params-table">
            <thead>
              <tr>
                <th>参数名</th>
                <th>类型</th>
                <th>默认值</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>loopData</td>
                <td>Array</td>
                <td>[]</td>
                <td>滚动的数据列表，每项需要包含 txt 属性</td>
              </tr>
              <tr>
                <td>direction</td>
                <td>string</td>
                <td>'landscape'</td>
                <td>滚动方向，可选值：'landscape'（横向）、'vertical'（竖向）</td>
              </tr>
              <tr>
                <td>speed</td>
                <td>number</td>
                <td>2</td>
                <td>滚动速度，数值越大滚动越快</td>
              </tr>
              <tr>
                <td>verticalItemHeight</td>
                <td>string</td>
                <td>'60px'</td>
                <td>竖向滚动时每项的高度</td>
              </tr>
              <tr>
                <td>reverse</td>
                <td>boolean</td>
                <td>false</td>
                <td>是否反向滚动</td>
              </tr>
              <tr>
                <td>hoverPause</td>
                <td>boolean</td>
                <td>false</td>
                <td>是否启用鼠标移入暂停功能</td>
              </tr>
              <tr>
                <td>autoPlay</td>
                <td>boolean</td>
                <td>true</td>
                <td>是否在初始化时自动开始滚动</td>
              </tr>
              <tr>
                <td>onClick</td>
                <td>function</td>
                <td>null</td>
                <td>点击项目时的回调，参数为 (item, index)</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    )
  }
}

export default MarqueePage