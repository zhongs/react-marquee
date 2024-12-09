import { useRef, useState } from 'react';
import { Marquee, MarqueeHandle } from '../../src/index';

const DEFAULT_SPEED = 2;

const App = () => {
  const horizontalRef = useRef<MarqueeHandle>(null);
  const verticalRef = useRef<MarqueeHandle>(null);
  
  const [horizontalSpeed, setHorizontalSpeed] = useState(DEFAULT_SPEED);
  const [verticalSpeed, setVerticalSpeed] = useState(DEFAULT_SPEED);
  const [horizontalReverse, setHorizontalReverse] = useState(false);
  const [verticalReverse, setVerticalReverse] = useState(false);

  const horizontalData = [
    { txt: "无缝滚动示例 1" },
    { txt: "无缝滚动示例 2" },
    { txt: "无缝滚动示例 3" },
    { txt: "无缝滚动示例 4" },
    { txt: "无缝滚动示例 5" }
  ];

  const verticalData = [
    { txt: "垂直滚动项 1" },
    { txt: "垂直滚动项 2" },
    { txt: "垂直滚动项 3" },
    { txt: "垂直滚动项 4" },
    { txt: "垂直滚动项 5" }
  ];

  const handleClick = (item: any, index: number) => {
    console.log('点击了:', item, '索引:', index);
    alert(`点击了: ${item.txt} (索引: ${index})`);
  };

  const handleHorizontalReset = () => {
    horizontalRef.current?.reset();
    setHorizontalSpeed(DEFAULT_SPEED);
    setHorizontalReverse(false);
  };

  const handleVerticalReset = () => {
    verticalRef.current?.reset();
    setVerticalSpeed(DEFAULT_SPEED);
    setVerticalReverse(false);
  };

  return (
    <div className="container">
      <h1>React 无缝滚动演示</h1>
      
      {/* 水平滚动演示 */}
      <section className="demo-section">
        <h2>水平滚动</h2>
        <div className="controls">
          <div className="speed-control">
            <label>速度:</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={horizontalSpeed}
              onChange={(e) => setHorizontalSpeed(Number(e.target.value))}
            />
            <span>{horizontalSpeed}</span>
          </div>
          <button onClick={() => setHorizontalReverse(!horizontalReverse)}>
            {horizontalReverse ? '切换为正向' : '切换为反向'}
          </button>
          <button onClick={() => horizontalRef.current?.play()}>开始</button>
          <button onClick={() => horizontalRef.current?.pause()}>暂停</button>
          <button onClick={handleHorizontalReset}>重置</button>
        </div>
        <div style={{ width: '100%', height: '40px', border: '1px solid #eee' }}>
          <Marquee
            ref={horizontalRef}
            loopData={horizontalData}
            speed={horizontalSpeed}
            direction="horizontal"
            reverse={horizontalReverse}
            hoverPause={true}
            onClick={handleClick}
          />
        </div>
        <p>提示：鼠标悬停可暂停滚动，点击项目可触发事件</p>
      </section>

      {/* 垂直滚动演示 */}
      <section className="demo-section">
        <h2>垂直滚动</h2>
        <div className="controls">
          <div className="speed-control">
            <label>速度:</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={verticalSpeed}
              onChange={(e) => setVerticalSpeed(Number(e.target.value))}
            />
            <span>{verticalSpeed}</span>
          </div>
          <button onClick={() => setVerticalReverse(!verticalReverse)}>
            {verticalReverse ? '切换为正向' : '切换为反向'}
          </button>
          <button onClick={() => verticalRef.current?.play()}>开始</button>
          <button onClick={() => verticalRef.current?.pause()}>暂停</button>
          <button onClick={handleVerticalReset}>重置</button>
        </div>
        <div className="vertical-container">
          <Marquee
            ref={verticalRef}
            loopData={verticalData}
            speed={verticalSpeed}
            direction="vertical"
            reverse={verticalReverse}
            hoverPause={true}
            onClick={handleClick}
          />
        </div>
        <p>提示：鼠标悬停可暂停滚动，点击项目可触发事件</p>
      </section>
    </div>
  );
};

export default App;
